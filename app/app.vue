<script lang="ts" setup>
</script>

<template>
  <UApp>
    <Body class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950">
      <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
      <!-- testing registration component -->
      <!-- <Registration /> -->
    </Body>
  </UApp>
</template>

<!-- <script>
import Registration from './pages/registration.vue'; // Adjust the path as needed

export default {
  components: {
    Registration,
  },
};
</script> -->
