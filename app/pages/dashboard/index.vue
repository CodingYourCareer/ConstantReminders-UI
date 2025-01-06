<template>
  <div class="p-4">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-light-textbase dark:text-dark-textbase">
        Dashboard
      </h1>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md shadow
               hover:bg-blue-700 transition-colors duration-200"
        @click="showModal = true"
      >
        Create Event
      </button>
    </div>

    <!-- Events List -->
    <EventList />

    <!-- Modal (only visible when showModal is true) -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <!-- Dark overlay -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50"
          @click="showModal = false"
        />

        <!-- Modal Container -->
        <div
          class="relative w-full max-w-lg bg-light-background dark:bg-dark-background
                 rounded-lg shadow-lg p-6 z-60"
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-light-textbase dark:text-dark-textbase">
              Create a New Event
            </h2>
            <!-- Close button -->
            <button
              class="text-light-secondary dark:text-dark-secondary hover:opacity-75"
              @click="showModal = false"
            >
              ✕
            </button>
          </div>

          <!-- Create Event Form -->
          <EventCreateForm @created-successfully="showModal = false" />

          <button
            class="mt-4 px-4 py-2 bg-gray-300 text-black rounded-md shadow
                   hover:bg-gray-400 transition-colors duration-200 w-full"
            @click="showModal = false"
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// Controls modal visibility
const showModal = ref(false)
</script>

<style scoped>
/* Simple Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
