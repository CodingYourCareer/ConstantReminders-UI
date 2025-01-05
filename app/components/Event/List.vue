<template>
  <div class="flex flex-col w-full items-center">
    <h1 class="text-2xl font-bold text-light-textbase dark:text-dark-textbase mb-6">
      Your Events
    </h1>

    <!-- Loading State -->
    <div
      v-if="listEventsQuery.isLoading"
      class="text-light-secondary dark:text-dark-secondary"
    >
      Loading events...
    </div>

    <!-- Error State -->
    <div
      v-else-if="listEventsQuery.isError"
      class="text-light-error dark:text-dark-error"
    >
      Error loading events: {{ listEventsQuery.error?.value?.message }}
    </div>

    <!-- Empty State -->
    <div
      v-else-if="events.length === 0"
      class="text-center py-8"
    >
      <p class="text-light-secondary dark:text-dark-secondary mb-4">
        No events found.
      </p>
      <p class="text-light-secondary dark:text-dark-secondary mb-6">
        Create an event to get started!
      </p>
    </div>

    <!-- Events Grid -->
    <ul
      v-else
      class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl"
    >
      <li
        v-for="eventItem in events"
        :key="eventItem.id"
      >
        <!-- Reusable EventCard component -->
        <EventCard :event="eventItem" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useEvents from '~/composables/useEventsService'
import type { IEvent } from '~/types'

const { listEventsQuery } = useEvents()

const events = computed<IEvent[]>(() => {
  return listEventsQuery.data.value?.data || []
})
</script>
