<template>
  <div
    ><button
      v-if="!loggedIn"
      @click="login('auth0')"
      class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded shadow transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >Login</button
    >
    <button v-else="loggedIn" @click="logout(currentProvider)">Logout</button></div
  >
</template>

<script setup lang="ts">
const { loggedIn, login, logout, currentProvider } = useOidcAuth();
</script>
