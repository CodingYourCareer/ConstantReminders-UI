<template>
  <div class="flex flex-col min-h-screen bg-light-background dark:bg-dark-background text-light-textbase dark:text-dark-textbase">
    <!-- Navbar component here -->

    <div class="flex-grow overflow-auto">
      <slot />
    </div>

    <!-- Footer component here -->
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>