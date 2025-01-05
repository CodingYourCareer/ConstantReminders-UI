import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  isElectronApp: true,
  send: (channel: string, data: any) => {
    // whitelist channels
    const validChannels = ['toMain', 'openExternalLink']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel: string, func: (...args: any[]) => void) => {
    const validChannels = ['fromMain']
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  },
  invoke: async (channel: string, data: any) => {
    const validChannels = ['getData', 'performAction']
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, data)
    }
  },
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },
  titleBarActions: {
    minimize: () => ipcRenderer.invoke('titlebar:action', 'minimize'),
    toggleMaximize: () => ipcRenderer.invoke('titlebar:action', 'toggleMaximize'),
    isMaximized: () => ipcRenderer.invoke('isMaximized:app', null),
    close: () => ipcRenderer.invoke('close:app', null),
  },
  windowStats: {
    onMaximizeChanged: (callback: (isMaximized: boolean) => void) => ipcRenderer.on('window:maximizeChanged', (_event, value) => callback(value)),
    onFullscreenChanged: (callback: (isFullscreen: boolean) => void) => ipcRenderer.on('window:fullscreenChanged', (_event, value) => callback(value)),
  },
  updater: {
    onStatusChanged: (callback: (status: string, progress?: any) => void) => ipcRenderer.on('updater:statusChanged', (_event, args) => callback(args[0], args[1])),
    onReadyToInstall: (callback: () => void) => ipcRenderer.on('updater:readyToInstall', () => callback()),
    checkForUpdate: () => ipcRenderer.invoke('updater:check'),
    quitAndInstall: () => ipcRenderer.invoke('updater:quitAndInstall'),
  },
})

// You can also expose environment variables if needed
contextBridge.exposeInMainWorld('env', process.env)

// Log when the preload script has finished executing
console.log('Preload script running')
console.log('Exposing electronAPI:', !!window.electronAPI)
