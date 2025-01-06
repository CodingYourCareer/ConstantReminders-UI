interface ElectronAPI {
  isElectronApp: boolean
  titleBarActions: {
    minimize: () => Promise<void>
    toggleMaximize: () => Promise<void>
    isMaximized: () => Promise<boolean>
    close: () => Promise<void>
  }
  windowStats: {
    onMaximizeChanged: (callback: (isMaximized: boolean) => void) => void
    onFullscreenChanged: (callback: (isFullscreen: boolean) => void) => void
  }
  updater: {
    onStatusChanged: (callback: (status: string, progress?: any) => void) => void
    onReadyToInstall: (callback: () => void) => void
    checkForUpdate: () => Promise<void>
    quitAndInstall: () => void
  }
}

interface Window {
  electronAPI: ElectronAPI
}
