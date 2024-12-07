<template>
  <div
    ><button
      v-if="!auth0.isAuthenticated"
      @click="login"
      class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded shadow transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >Login</button
    >
    <button v-else="auth0.isAuthenticated" @click="logout">Logout</button></div
  >
</template>

<script setup lang="ts">
import { ref } from 'vue';
import auth0 from '../auth/auth';

const userProfile = ref<any>(null);

const login = async () => {
  try {
    await auth0.loginWithRedirect();
  } catch (error) {
    console.error('Login failed', error);
  }
};

const logout = async () => {
  try {
    await auth0.logout();
    userProfile.value = null;
  } catch (error) {
    console.error('Logout failed', error);
  }
};
</script>
