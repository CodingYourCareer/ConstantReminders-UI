import { ref } from 'vue';

type UpdaterStatus = 'idle' | 'check-for-update' | 'update-available' | 'update-not-available' | 'update-error' | 'downloading' | 'update-downloaded';

const currentStatus = ref<UpdaterStatus>('idle');
const progress = ref<any>();
const readyToInstall = ref(false);
const alreadyInitialized = ref(false);

export default function useUpdater() {
  const isServer = import.meta.server;
  const isElectron = !isServer && typeof window !== 'undefined' && !!window.electronAPI;
  
  if (!isElectron || isServer) return { isElectron };

  if (!alreadyInitialized.value) {
    alreadyInitialized.value = true;
    window.electronAPI.updater.onStatusChanged((status, progressInfo) => {
      currentStatus.value = status as UpdaterStatus;
      progress.value = progressInfo;
      console.warn({ currentStatus: currentStatus.value });
    });
    window.electronAPI.updater.onReadyToInstall(() => {
      readyToInstall.value = true;
    });
  }

  async function checkForUpdate() {
    await window.electronAPI.updater.checkForUpdate();
  }

  function quitAndInstall() {
    if (!readyToInstall.value) return;
    window.electronAPI.updater.quitAndInstall();
  }

  return { isElectron, currentStatus, progress, readyToInstall, checkForUpdate, quitAndInstall };
}
