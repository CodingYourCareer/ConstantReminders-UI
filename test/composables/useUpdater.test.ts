/* eslint-disable nuxt/prefer-import-meta */
import useUpdater from '../../app/composables/useUpdater'

describe('useUpdater', () => {
  let originalWindow: typeof globalThis.window
  let originalServer: boolean | undefined

  beforeEach(() => {
    // Save the original global objects
    originalWindow = global.window
    originalServer = process.server

    // Mock `window.electronAPI`
    global.window = {
      electronAPI: {
        updater: {
          onStatusChanged: jest.fn(),
          onReadyToInstall: jest.fn(),
          checkForUpdate: jest.fn().mockResolvedValue(undefined),
          quitAndInstall: jest.fn(),
        },
      },
    } as unknown as typeof globalThis.window

    // Add `process.server` mock
    process.server = false
  })

  afterEach(() => {
    // Restore the original global objects
    global.window = originalWindow

    // Restore the original value of `process.server`
    if (originalServer === undefined) {
      delete process.server
    }
    else {
      process.server = originalServer
    }

    jest.clearAllMocks()
  })

  it('should return isElectron as false on the server', () => {
    process.server = true // Simulate server environment
    const { isElectron } = useUpdater()
    expect(isElectron).toBe(false)
  })

  it('should return isElectron as false when not in an Electron environment', () => {
    process.server = false // Simulate non-server environment
    global.window = {} as typeof globalThis.window
    const { isElectron } = useUpdater()
    expect(isElectron).toBe(false)
  })

  it('should initialize the updater only once', () => {
    process.server = false

    const { isElectron } = useUpdater()
    expect(isElectron).toBe(true)

    const updater = global.window.electronAPI?.updater
    expect(updater?.onStatusChanged).toHaveBeenCalledTimes(1)
    expect(updater?.onReadyToInstall).toHaveBeenCalledTimes(1)

    useUpdater() // Call again to verify initialization only happens once
    expect(updater?.onStatusChanged).toHaveBeenCalledTimes(1)
    expect(updater?.onReadyToInstall).toHaveBeenCalledTimes(1)
  })

  it('should call checkForUpdate when invoked', async () => {
    process.server = false

    const { checkForUpdate } = useUpdater()
    await checkForUpdate?.()

    expect(
      global.window.electronAPI?.updater.checkForUpdate,
    ).toHaveBeenCalledTimes(1)
  })

  it('should call quitAndInstall when readyToInstall is true', () => {
    process.server = false

    const { quitAndInstall, readyToInstall } = useUpdater()
    readyToInstall!.value = true
    quitAndInstall?.()

    expect(
      global.window.electronAPI?.updater.quitAndInstall,
    ).toHaveBeenCalledTimes(1)
  })

  it('should not call quitAndInstall when readyToInstall is false', () => {
    process.server = false

    const { quitAndInstall, readyToInstall } = useUpdater()
    readyToInstall!.value = false // Explicitly set it to false
    quitAndInstall?.()

    expect(
      global.window.electronAPI?.updater.quitAndInstall,
    ).not.toHaveBeenCalled()
  })
})
