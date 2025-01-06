<template>
  <div
    class="bg-light-background dark:bg-dark-background
           rounded-md p-4 border border-light-border
           dark:border-dark-border shadow-sm"
  >
    <h2 class="text-lg font-semibold text-light-textbase dark:text-dark-textbase mb-2">
      {{ event.name }}
    </h2>
    <p class="text-sm text-light-secondary dark:text-dark-secondary mb-1">
      <span class="font-medium">Created By:</span> {{ event.createdBy }}
    </p>
    <p class="text-sm text-light-secondary dark:text-dark-secondary mb-1">
      <span class="font-medium">Created On:</span>
      {{ toLocalTime(event.createdDateTime) }}
    </p>
    <p class="text-sm text-light-secondary dark:text-dark-secondary mb-1">
      <span class="font-medium">Updated By:</span> {{ event.updatedBy }}
    </p>
    <p class="text-sm text-light-secondary dark:text-dark-secondary">
      <span class="font-medium">Updated On:</span>
      {{ toLocalTime(event.updatedDateTime) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IEvent } from '~/types'
import useLocalTime from '~/composables/useLocalTime'

// Props
interface Props {
  event: IEvent
}

defineProps<Props>()

const { toLocalTime } = useLocalTime()
</script>
