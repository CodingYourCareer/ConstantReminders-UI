<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <AuthButton />
    <div v-if="loggedIn">
      <!-- <p>{{ userProfile?.name }}</p>
      <img :src="userProfile?.picture" alt="User Profile Picture" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthButton from '@/components/AuthButton.vue';
const { loggedIn, user, login, logout, currentProvider } = useOidcAuth();

console.log("user", user);
console.log("loggedIn", loggedIn);
console.log("currentProvider", currentProvider);

</script>
