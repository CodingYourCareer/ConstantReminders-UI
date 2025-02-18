<script setup>
import { ref, computed } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css'; 
import useUserService from '~/composables/useUserService';

const { registerUserMutation } = useUserService();

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
});

const phoneOptions = {
  mode: 'international', // Display phone in international format
  defaultCountry: 'us', 
  preferredCountries: ['us', 'ca', 'gb'],
  validCharactersOnly: true,
  autoFormat: true,
  dropdownOptions: { showFlags: true },
};

// Phone number validation
const isPhoneValid = computed(() => formData.value.phone?.length > 6); // Basic length check
const isEmailValid = computed(() => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(formData.value.email);
});

const isFormValid = computed(() => {
  return formData.value.lastName && (isPhoneValid.value || isEmailValid.value);
});

const register = async () => {
  console.log('Submitting formData:', JSON.stringify(formData.value));
  try {
    await registerUserMutation.mutateAsync(formData.value);
  } catch (error) {
    console.error('Error during registration:', error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 via-blue-700 to-blue-900 flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white rounded-md shadow-lg p-8">
      <h2 class="text-2xl font-bold mb-4">User Profile</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium">First Name:</label>
          <input type="text" id="firstName" v-model="formData.firstName" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium">Last Name (Required):</label>
          <input type="text" id="lastName" v-model="formData.lastName" required class="mt-1 p-2 w-full border rounded-md">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">Phone:</label>
          <VueTelInput 
            v-model="formData.phone" 
            v-bind="phoneOptions" 
            @input="isPhoneValid"
            class="mt-1 p-2 w-full border rounded-md">
          </VueTelInput>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email:</label>
          <input type="email" id="email" v-model="formData.email" :class="{'border-red-500': !isEmailValid && formData.email}" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <button type="submit" :disabled="!isFormValid" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:opacity-50">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>


