<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import intlTelInput from 'intl-tel-input';
import useUserService from '~/composables/useUserService';
import 'intl-tel-input/build/css/intlTelInput.css';
import { form } from '#build/ui';

const { registerUserMutation } = useUserService();

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
});

const phoneInput = ref(''); // Reference for the phone input
let iti = null;

onMounted(() => {
  console.log('Initializing intlTelInput...');
  if (phoneInput.value) {
    console.log('Phone input element:', phoneInput.value);

    iti = intlTelInput(phoneInput.value, {
      initialCountry: 'us',
      separateDialCode: true,
      preferredCountries: ['us', 'ca', 'gb'],
    });

    console.log('intlTelInput instance:', iti);

    // Check the phone number immediately after initialization
    const number = iti.getNumber();
    console.log('Phone number immediately after initialization:', number);
  } else {
    console.error('phoneInput is not available!');
  }
});



const updatePhone = () => {
  if (iti) {
    const number = iti.getNumber();
    console.log('Extracted phone number after user input:', number);
    if (number) {
      formData.value.phone = number;
    } else {
      console.warn('Phone number is invalid or empty');
    }
  } else {
    console.error('iti instance is null');
  }
};


const isPhoneValid = computed(() => (iti ? iti.isValidNumber() : false));
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(formData.value.email);
});
const isFormValid = computed(() => {
  return formData.value.lastName && (isPhoneValid.value || isEmailValid.value);
});

const register = async () => {
  updatePhone();
  console.log('Submitting formData:', JSON.stringify(formData.value)); // Debugging output
  try {
    await registerUserMutation.mutateAsync(formData.value);
  } catch (error) {
    console.error('Error during registration:', error);
  }
};
</script>

<template>
  <div>
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
            <label for="phone" class="block text-sm font-medium">Phone:</label>
            <input :ref="formData.phone" type="tel" v-model="formData.phone" @input="updatePhone" class="mt-1 p-2 w-full border rounded-md">
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
  </div>
</template>

