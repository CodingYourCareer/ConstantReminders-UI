<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface NavbarItem {
  label: string
  to?: RouteLocationRaw
  requiresAuth?: boolean
  children?: NavbarItem[]
}

interface InfoBarData {
  email?: string
  phone?: string
  socials?: {
    name: string
    link: string
    icon: string
  }[]
}

const props = defineProps<{
  brand: string
  infoBar?: InfoBarData
  menuItems: NavbarItem[]
}>()

const mobileMenuOpen = ref(false)
const colorMode = useColorMode()
const { signIn, signOut, status } = useAuth()

const router = useRouter()

/**
 * Filter out items requiring auth if user isn't authenticated
 */
const filteredMenuItems = computed<NavbarItem[]>(() => {
  return props.menuItems
    .map((item) => {
      if (item.requiresAuth && status.value === 'unauthenticated') {
        return null
      }
      return item
    })
    .filter(Boolean) as NavbarItem[]
})

/**
 * Toggle the mobile menu open/close
 */
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

/**
 * Rotate theme preference between dark/light/system
 */
function toggleTheme() {
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light'
  }
  else if (colorMode.preference === 'light') {
    colorMode.preference = 'system'
  }
  else {
    colorMode.preference = 'dark'
  }
}

/**
 * Utility to check if the route is currently active.
 */
function isActiveRoute(routeOrPath?: RouteLocationRaw): boolean {
  if (!routeOrPath) return false
  const currentPath = router.currentRoute.value.path

  if (typeof routeOrPath === 'string') {
    return currentPath === routeOrPath
  }
  if ('path' in routeOrPath && routeOrPath.path) {
    return currentPath === routeOrPath.path
  }
  return false
}
</script>

<template>
  <!-- NAV WRAPPER -->
  <nav
    class="w-full shadow-sm bg-light-surface dark:bg-dark-surface text-light-textbase dark:text-dark-textbase transition-colors duration-300"
  >
    <!-- MAIN NAVBAR -->
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Brand / Logo -->
      <div class="flex items-center space-x-2">
        <!-- Logo image -->
        <!-- <NuxtLink to="/">
          <img
            src="/assets/images/ConstantRemindersLogo.png"
            alt="Constant Reminders Logo"
            class="w-8 h-8 mr-2 object-contain"
          >
        </NuxtLink> -->

        <!-- Brand text -->
        <NuxtLink to="/">
          <span class="font-bold text-xl text-light-primary dark:text-dark-primary transition-colors duration-200">
            {{ props.brand }}
          </span>
        </NuxtLink>
      </div>

      <!-- DESKTOP MENU (hidden on small screens) -->
      <ul class="hidden md:flex items-center space-x-4">
        <!-- Navigation Items -->
        <li
          v-for="(item, index) in filteredMenuItems"
          :key="index"
          class="relative group"
        >
          <!-- If the item has children => dropdown -->
          <template v-if="item.children && item.children.length > 0">
            <UButton
              class="inline-flex items-center gap-1 transition-colors duration-200"
              :class="{
                'text-light-primary dark:text-dark-primary font-semibold':
                  isActiveRoute(item.to),
              }"
            >
              {{ item.label }}
              <Icon
                name="mdi:chevron-down"
                class="w-4 h-4"
              />
            </UButton>

            <!-- Sub-menu -->
            <ul
              class="absolute left-0 top-full bg-white dark:bg-gray-700 shadow-sm rounded-sm mt-1 w-48 py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity"
            >
              <li
                v-for="(child, idx) in item.children"
                :key="idx"
                class="px-4 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <NuxtLink
                  v-if="child.to"
                  :to="child.to"
                  class="block w-full"
                >
                  {{ child.label }}
                </NuxtLink>
                <span v-else>{{ child.label }}</span>
              </li>
            </ul>
          </template>
          <!-- If no sub-items => normal link -->
          <template v-else>
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="px-3 py-2 transition-colors duration-200 hover:text-light-primary dark:hover:text-dark-primary"
              :class="{
                'text-light-primary dark:text-dark-primary font-semibold':
                  isActiveRoute(item.to),
              }"
            >
              {{ item.label }}
            </NuxtLink>
            <span
              v-else
              class="px-3 py-2 transition-colors duration-200 cursor-default"
            >
              {{ item.label }}
            </span>
          </template>
        </li>

        <!-- SEPARATOR BEFORE LOGIN & THEME -->
        <li>
          <span class="mx-1 text-gray-400 dark:text-gray-500 select-none">
            |
          </span>
        </li>

        <!-- LOGIN / LOGOUT link -->
        <li>
          <UButton
            class="px-3 py-2 transition-colors duration-200 rounded-sm hover:text-light-primary dark:hover:text-dark-primary"
            @click="status === 'authenticated' ? signOut({ callbackUrl: '/' }) : signIn('auth0')"
          >
            Log {{ status === 'authenticated' ? 'out' : 'in' }}
          </UButton>
        </li>

        <!-- SEPARATOR BEFORE THEME SWITCHER -->
        <li>
          <span class="mx-1 text-gray-400 dark:text-gray-500 select-none">
            |
          </span>
        </li>

        <!-- THEME SWITCHER (Desktop) -->
        <li>
          <UButton
            class="flex items-center gap-1 px-3 py-2 transition-colors duration-200 rounded-sm hover:text-light-primary dark:hover:text-dark-primary"
            :title="'Rotate Theme (light/dark/system)'"
            @click="toggleTheme"
          >
            <Icon
              v-if="colorMode.preference === 'dark'"
              name="ph:sun-bold"
              class="w-5 h-5"
            />
            <Icon
              v-else-if="colorMode.preference === 'system'"
              name="ph:desktop-tower-bold"
              class="w-5 h-5"
            />
            <Icon
              v-else
              name="ph:moon-bold"
              class="w-5 h-5"
            />
            <span class="text-sm">Theme</span>
          </UButton>
        </li>
      </ul>

      <!-- MOBILE MENU UButton -->
      <UButton
        class="md:hidden p-2 rounded-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="toggleMobileMenu"
      >
        <Icon
          name="heroicons:bars-3-bottom-right"
          class="w-6 h-6"
        />
      </UButton>
    </div>

    <!-- MOBILE MENU (visible when mobileMenuOpen) -->
    <transition name="fade">
      <ul
        v-if="mobileMenuOpen"
        class="md:hidden flex flex-col space-y-1 px-4 pb-4 bg-light-surface dark:bg-dark-surface shadow-sm transition-colors duration-300"
      >
        <!-- Navigation Items -->
        <li
          v-for="(item, index) in filteredMenuItems"
          :key="index"
          class="border-b border-light-secondary/10 dark:border-dark-secondary/20 py-2"
        >
          <!-- Check if there's a sub-menu -->
          <template v-if="item.children && item.children.length > 0">
            <div class="flex items-center justify-between">
              <span
                class="font-semibold"
                :class="{
                  'text-light-primary dark:text-dark-primary': isActiveRoute(item.to),
                }"
              >
                {{ item.label }}
              </span>
              <!-- (Optional) Could add a toggle icon for collapsible sub-menu -->
            </div>
            <!-- Sub-items (always open in this example) -->
            <ul class="ml-4 mt-2 space-y-1">
              <li
                v-for="(child, idx) in item.children"
                :key="idx"
              >
                <NuxtLink
                  v-if="child.to"
                  :to="child.to"
                  class="block py-1 text-sm transition-colors duration-200 hover:underline"
                  @click="mobileMenuOpen = false"
                >
                  {{ child.label }}
                </NuxtLink>
                <span
                  v-else
                  class="block py-1 text-sm"
                >
                  {{ child.label }}
                </span>
              </li>
            </ul>
          </template>
          <!-- If no sub-items => simple link -->
          <template v-else>
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="block py-2 px-1 transition-colors duration-200 hover:text-light-primary dark:hover:text-dark-primary"
              :class="{
                'text-light-primary dark:text-dark-primary font-semibold': isActiveRoute(item.to),
              }"
              @click="mobileMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
            <span
              v-else
              class="block py-2 px-1 transition-colors duration-200"
            >
              {{ item.label }}
            </span>
          </template>
        </li>

        <!-- MOBILE SEPARATOR (above login & theme) -->
        <li class="mt-2">
          <hr class="border-light-secondary/20 dark:border-dark-secondary/20">
        </li>

        <!-- MOBILE LOGIN / LOGOUT -->
        <li class="flex items-center justify-start gap-2 py-2">
          <UButton
            class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            @click="mobileMenuOpen = false && (status === 'authenticated' ? signOut() : signIn('auth0'))"
          >
            {{ status === 'authenticated' ? 'Logout' : 'Login' }}
          </UButton>
        </li>

        <!-- MOBILE THEME SWITCHER -->
        <li class="flex items-center justify-start gap-2 py-2">
          <UButton
            class="flex items-center gap-1 p-2 rounded-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :title="'Rotate Theme (light/dark/system)'"
            @click="toggleTheme"
          >
            <Icon
              v-if="colorMode.preference === 'dark'"
              name="ph:sun-bold"
              class="w-5 h-5"
            />
            <Icon
              v-else-if="colorMode.preference === 'system'"
              name="ph:desktop-tower-bold"
              class="w-5 h-5"
            />
            <Icon
              v-else
              name="ph:moon-bold"
              class="w-5 h-5"
            />
            <span class="text-sm">Theme</span>
          </UButton>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
