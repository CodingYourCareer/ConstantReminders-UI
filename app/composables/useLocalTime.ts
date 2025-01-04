import type { Ref } from 'vue';

/**
 * A composable for converting UTC dates/times into local time strings.
 */
export default function useLocalTime() {
  /**
   * A ref that holds the latest formatted local time string.
   */
  const localTime: Ref<string> = ref('');

  /**
   * Converts an ISO UTC datetime (string or Date) into the user's local time format.
   *
   * @param isoUtcDatetime - The UTC datetime to format (can be an ISO string, a Date object, or undefined).
   * @returns The formatted local time string. If `isoUtcDatetime` is not provided, returns an empty string.
   */
  const toLocalTime = (isoUtcDatetime: string | Date | undefined): string => {
    if (!isoUtcDatetime) {
      return '';
    }

    // Create a new Date object from the provided string or Date object.
    const date = new Date(isoUtcDatetime);

    // Define how the date should be formatted.
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    };

    // Format the date according to the user's locale and the specified options.
    localTime.value = new Intl.DateTimeFormat(undefined, options).format(date);

    return localTime.value;
  };

  return {
    /**
     * Reactive string holding the latest local time formatting.
     */
    localTime,

    /**
     * Function that converts a provided UTC datetime into the local time format.
     */
    toLocalTime
  };
}
