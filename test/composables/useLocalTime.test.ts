import useLocalTime from '../../app/composables/useLocalTime'

describe('useLocalTime', () => {
  let composable: ReturnType<typeof useLocalTime>

  beforeEach(() => {
    composable = useLocalTime()
  })

  it('should initialize with an empty localTime value', () => {
    const { localTime } = composable
    expect(localTime.value).toBe('')
  })

  it('should return an empty string when no date is provided', () => {
    const { toLocalTime } = composable
    const result = toLocalTime(undefined)
    expect(result).toBe('')
    expect(composable.localTime.value).toBe('')
  })

  it('should format a valid ISO string into the local time format', () => {
    const { toLocalTime, localTime } = composable
    const isoUtcDatetime = '2023-01-01T12:00:00Z'

    const result = toLocalTime(isoUtcDatetime)

    // Verify the formatted string matches the expected local format
    expect(result).not.toBe('')
    expect(result).toContain('2023') // Adjust as necessary based on your locale
    expect(localTime.value).toBe(result)
  })

  it('should format a valid Date object into the local time format', () => {
    const { toLocalTime, localTime } = composable
    const date = new Date('2023-01-01T12:00:00Z')

    const result = toLocalTime(date)

    // Verify the formatted string matches the expected local format
    expect(result).not.toBe('')
    expect(result).toContain('2023') // Adjust as necessary based on your locale
    expect(localTime.value).toBe(result)
  })

  it('should handle invalid dates gracefully', () => {
    const { toLocalTime, localTime } = composable

    const result = toLocalTime('invalid-date')
    expect(result).toBe('Invalid Date')
    expect(localTime.value).toBe('Invalid Date')
  })

  it('should update the localTime ref when a new date is converted', () => {
    const { toLocalTime, localTime } = composable

    toLocalTime('2023-01-01T12:00:00Z')
    const firstValue = localTime.value

    toLocalTime('2024-01-01T12:00:00Z')
    const secondValue = localTime.value

    expect(firstValue).not.toBe(secondValue)
  })
})
