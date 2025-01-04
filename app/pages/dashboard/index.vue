<script setup>
const { status, data } = useAuth();
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-lg bg-white rounded-lg shadow p-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Dashboard</h1>
      <p class="text-gray-600 mb-6 text-center">
        This is a protected route. Only authenticated users can view this page.
      </p>

      <div class="mb-4">
        <h2 class="text-lg font-semibold text-gray-700">Session Status</h2>
        <div class="mt-2">
          <div class="flex items-center space-x-2">
            <span class="font-medium text-gray-700">Status:</span>
            <span class="text-gray-900">{{ status }}</span>
          </div>
          <div class="flex items-start space-x-2 mt-2">
            <span class="font-medium text-gray-700">Data:</span>
            <pre class="text-sm text-gray-800 bg-gray-100 p-2 rounded overflow-auto max-h-48">{{ data }}</pre>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <NuxtLink to="/"
          class="inline-block px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150">
          Go to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
