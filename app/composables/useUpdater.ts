import { ref } from 'vue'

type UpdaterStatus = 'idle' | 'check-for-update' | 'update-available' | 'update-not-available' | 'update-error' | 'downloading' | 'update-downloaded'

const currentStatus = ref<UpdaterStatus>('idle')
interface ProgressInfo {
  percent: number
  total: number
  transferred: number
}

const progress = ref<ProgressInfo | null>(null)
const readyToInstall = ref(false)
const alreadyInitialized = ref(false)

export default function useUpdater() {
  // eslint-disable-next-line nuxt/prefer-import-meta
  const isServer = process.server
  const isElectron = !isServer && typeof window !== 'undefined' && !!window.electronAPI

  if (!isElectron || isServer) return { isElectron }

  if (!alreadyInitialized.value) {
    alreadyInitialized.value = true
    window.electronAPI.updater.onStatusChanged((status, progressInfo) => {
      currentStatus.value = status as UpdaterStatus
      progress.value = progressInfo
      console.warn({ currentStatus: currentStatus.value })
    })
    window.electronAPI.updater.onReadyToInstall(() => {
      readyToInstall.value = true
    })
  }

  async function checkForUpdate() {
    await window.electronAPI.updater.checkForUpdate()
  }

  function quitAndInstall() {
    if (!readyToInstall.value) return
    window.electronAPI.updater.quitAndInstall()
  }

  return { isElectron, currentStatus, progress, readyToInstall, checkForUpdate, quitAndInstall }
}
