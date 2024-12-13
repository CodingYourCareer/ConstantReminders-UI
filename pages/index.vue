<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-purple-100 flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white rounded-md shadow-lg p-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h1>
      <p class="text-gray-600 mb-6"> You are logged in. Feel free to access your personalized dashboard or log out. </p>
      <div class="flex space-x-4">
        <AuthButton
          @click="signOut"
          class="px-5 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150"
        >
          Logout
        </AuthButton>
        <NuxtLink
          to="/dashboard"
          class="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
        >
          Go to Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signOut } = useAuth();

definePageMeta({
  auth: false
})
</script>
