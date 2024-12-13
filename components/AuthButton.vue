<template>
  <button
    v-if="status === 'unauthenticated'"
    @click="signIn('auth0')"
    class="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    Login
  </button>

  <button
    v-else-if="status === 'authenticated'"
    @click="signOut('auth0')"
    class="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
  >
    Logout
  </button>
</template>

<script setup lang="ts">
const { signIn, signOut, status } = useAuth();
</script>
