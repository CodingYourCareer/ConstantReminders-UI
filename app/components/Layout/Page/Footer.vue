<script lang="ts" setup>
type Props = {
  year: number
  name: string
  appName: string
  innerClass?: string
}

const props = defineProps<Props>()
</script>

<template>
  <footer
    class="flex border-t border-light-surface dark:border-dark-surface border-opacity-10 dark:border-opacity-20 bg-light-surface dark:bg-dark-surface"
  >
    <div
      :class="[
        'flex-1 justify-between max-w-(--breakpoint-2xl) mx-auto px-4 flex flex-col md:flex-row py-2 space-y-2 md:space-y-0 items-center text-xs text-center md:text-left text-light-textbase dark:text-dark-textbase',
        props.innerClass,
      ]"
    >
      <div>
        Copyright ©
        {{ props.year }}
        {{ props.name }}. All rights reserved.
      </div>
      <div>{{ props.appName }}</div>
    </div>
  </footer>
</template>
