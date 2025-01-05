<template>
  <div class="flex flex-col w-full max-w-md mx-auto p-4 rounded-lg bg-light-background dark:bg-dark-background shadow-md">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-light-textbase dark:text-dark-textbase mb-4">
      Create a New Event
    </h2>

    <!-- Event Name Field -->
    <label
      for="eventName"
      class="block mb-1 text-sm font-medium text-light-textbase dark:text-dark-textbase"
    >
      Event Name
    </label>
    <input
      id="eventName"
      v-model="eventName"
      type="text"
      class="w-full p-2 border rounded-md text-light-textbase dark:text-dark-textbase
             border-light-border dark:border-dark-border
             bg-light-background dark:bg-dark-background
             focus:outline-none focus:ring focus:ring-blue-500
             mb-3"
      placeholder="Enter event name"
    >

    <!-- Submit Button -->
    <button
      :disabled="!eventName || createEventMutation.isPending.value"
      class="px-4 py-2 bg-blue-600 text-white rounded-md shadow
             hover:bg-blue-700 disabled:bg-gray-300
             disabled:cursor-not-allowed w-full"
      @click="handleCreate"
    >
      {{ createEventMutation.isPending ? 'Creating...' : 'Create Event' }}
    </button>

    <!-- Error Message (if mutation fails) -->
    <p
      v-if="createEventMutation.isError"
      class="text-red-500 text-sm mt-3"
    >
      {{ createEventMutation.error?.value?.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useEvents from '~/composables/useEventsService'
import type { ICreateEventRequest } from '~/types'

// Access the createEventMutation from your composable
const { createEventMutation } = useEvents()

// The event name field
const eventName = ref('')

function handleCreate() {
  if (!eventName.value.trim()) {
    return
  }

  // Build the payload
  const payload: ICreateEventRequest = {
    name: eventName.value,
  }

  // Use the mutation to create the event
  createEventMutation.mutate(payload, {
    onSuccess: () => {
      // Clear the input on success
      eventName.value = ''
    },
  })
}
</script>
