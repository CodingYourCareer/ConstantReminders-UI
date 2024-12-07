<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <AuthButton />
        <div v-if="auth0.isAuthenticated()">
      <p>{{ userProfile?.name }}</p>
      <img :src="userProfile?.picture" alt="User Profile Picture" />
    </div>
    </div>
</template>

<script setup lang="ts">
import AuthButton from '@/components/AuthButton.vue';
import auth0 from '@/auth/auth';
import { ref } from 'vue';
const userProfile = ref(false);
</script>