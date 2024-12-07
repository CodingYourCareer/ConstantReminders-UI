<template>
  <div>
    <h1>Welcome to Constant Reminders</h1>

    <button v-if="!isAuthenticated" @click="login" class="px-6
  py-2
  bg-indigo-600
  hover:bg-indigo-700
  text-white
  font-semibold
  rounded
  shadow
  transition-colors
  duration-150
  ease-in-out
  focus:outline-none
  focus:ring-2
  focus:ring-indigo-500
  focus:ring-offset-2
">Login</button>
    <button v-if="isAuthenticated" @click="logout">Logout</button>

    <div v-if="isAuthenticated">
      <p>{{ userProfile?.name }}</p>
      <img :src="userProfile?.picture" alt="User Profile Picture" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import  auth0  from './auth/auth'; // Import the auth0 client setup from auth.ts

export default defineComponent({
  name: 'App',
  setup() {
    const isAuthenticated = ref(false);
    const userProfile = ref<any>(null);

    const login = async () => {
      try {
        await auth0.loginWithRedirect();
      } catch (error) {
        console.error("Login failed", error);
      }
    };

    const logout = async () => {
      try {
        await auth0.logout();
        isAuthenticated.value = false;
        userProfile.value = null;
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    const getUserProfile = async () => {
      try {
        isAuthenticated.value = await auth0.isAuthenticated();
        if (isAuthenticated.value) {
          userProfile.value = await auth0.getUser();
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

        // Handle redirect callback (this should be called after a successful login)
        const handleRedirectCallback = async () => {
      try {
        await auth0.handleRedirectCallback(); // Process the redirect callback
        await getUserProfile(); // Update the user profile
      } catch (error) {
        console.error("Error handling redirect", error);
      }
    };


  // Check authentication status when the component is mounted
  onMounted(async () => {
      // First, handle any redirect callback
      if (window.location.search.includes("code=") || window.location.search.includes("error=")) {
        await handleRedirectCallback();
      }
      // Then, check authentication status
      await getUserProfile();
    });

    return { isAuthenticated, userProfile, login, logout };
  }
});
</script>

<style scoped>
button {
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
}
</style>





