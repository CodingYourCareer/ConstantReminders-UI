import { ref } from 'vue'

export default function useElectron() {
  // eslint-disable-next-line nuxt/prefer-import-meta
  const isServer = process.server // not using import.meta because of unit test compatibility between vue/nuxt and electron.
  const isElectron = !isServer && typeof window !== 'undefined' && !!window.electronAPI

  if (!isElectron || isServer) return { isElectron }

  // Window title bar actions
  const titleBarActions = window.electronAPI.titleBarActions

  // Window title bar stats
  const windowStats = ref({
    isMaximized: false,
    isFullscreen: false,
  })

  window.electronAPI.windowStats.onMaximizeChanged((value) => {
    windowStats.value.isMaximized = value
  })
  window.electronAPI.windowStats.onFullscreenChanged((value) => {
    windowStats.value.isFullscreen = value
  })

  return { isElectron, titleBarActions, windowStats }
}
