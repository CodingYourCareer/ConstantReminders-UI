<template>
  <div>
    <h1 class="title">Welcome to Constant Reminders</h1>
    <p id="electron-status">isElectron: {{ useElectron().isElectron }}</p>
    <p>An App to keep you organized! </p>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
<style>
.title {
  font-weight: bold;
  font-size: 3rem;
  color: darkblue;
}
</style>
