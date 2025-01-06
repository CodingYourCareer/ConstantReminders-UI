import useElectron from '../../app/composables/useElectron'

describe('useElectron', () => {
  let originalWindow: typeof globalThis.window // Explicitly type originalWindow

  beforeEach(() => {
    originalWindow = global.window
    // Mock window.electronAPI
    global.window = {
      electronAPI: {
        titleBarActions: {
          minimize: jest.fn(),
          toggleMaximize: jest.fn(),
          isMaximized: jest.fn(),
          close: jest.fn(),
        },
        windowStats: {
          onMaximizeChanged: jest.fn(),
          onFullscreenChanged: jest.fn(),
        },
      },
    } as unknown as typeof globalThis.window // Type assertion to satisfy TypeScript
  })

  afterEach(() => {
    global.window = originalWindow // Assign back without error
    jest.clearAllMocks()
  })

  it('should return isElectron as true when window.electronAPI exists', () => {
    const { isElectron } = useElectron()
    expect(isElectron).toBe(true)
  })

  it('should return isElectron as false when window.electronAPI does not exist', () => {
    global.window = {} as typeof globalThis.window
    const { isElectron } = useElectron()
    expect(isElectron).toBe(false)
  })

  it('should return titleBarActions when in Electron environment', () => {
    const { titleBarActions } = useElectron()
    expect(titleBarActions).toBeDefined()
    expect(titleBarActions).toEqual(window.electronAPI?.titleBarActions)
  })

  it('should set up windowStats correctly', () => {
    const { windowStats } = useElectron()
    expect(windowStats?.value).toEqual({
      isMaximized: false,
      isFullscreen: false,
    })

    // Test onMaximizeChanged
    const maximizeCallback = (
      window.electronAPI?.windowStats.onMaximizeChanged as jest.Mock
    ).mock.calls[0][0]
    maximizeCallback(true)
    expect(windowStats?.value.isMaximized).toBe(true)

    // Test onFullscreenChanged
    const fullscreenCallback = (
      window.electronAPI?.windowStats.onFullscreenChanged as jest.Mock
    ).mock.calls[0][0]
    fullscreenCallback(true)
    expect(windowStats?.value.isFullscreen).toBe(true)
  })
})
