import useElectron from '../../composables/useElectron';

jest.mock('vue', () => ({
  ref: jest.fn((val) => ({ value: val }))
}));

describe('useElectron', () => {
  let originalWindow: any;

  beforeEach(() => {
    originalWindow = global.window;
    // Mock window.electronAPI
    (global as any).window = {
      electronAPI: {
        titleBarActions: {
          minimize: jest.fn(),
          toggleMaximize: jest.fn(),
          isMaximized: jest.fn(),
          close: jest.fn()
        },
        windowStats: {
          onMaximizeChanged: jest.fn(),
          onFullscreenChanged: jest.fn()
        }
      }
    };
  });

  afterEach(() => {
    (global as any).window = originalWindow;
    jest.clearAllMocks();
  });

  it('should return isElectron as true when window.electronAPI exists', () => {
    const { isElectron } = useElectron();
    expect(isElectron).toBe(true);
  });

  it('should return isElectron as false when window.electronAPI does not exist', () => {
    (global as any).window = {};
    const { isElectron } = useElectron();
    expect(isElectron).toBe(false);
  });

  it('should return titleBarActions when in Electron environment', () => {
    const { titleBarActions } = useElectron();
    expect(titleBarActions).toBeDefined();
    expect(titleBarActions).toEqual(window.electronAPI.titleBarActions);
  });

  it('should set up windowStats correctly', () => {
    const { windowStats } = useElectron();
    expect(windowStats?.value).toEqual({ isMaximized: false, isFullscreen: false });

    // Test onMaximizeChanged
    const maximizeCallback = (window as any).electronAPI.windowStats.onMaximizeChanged.mock.calls[0][0];
    maximizeCallback(true);
    expect(windowStats?.value.isMaximized).toBe(true);

    // Test onFullscreenChanged
    const fullscreenCallback = (window as any).electronAPI.windowStats.onFullscreenChanged.mock.calls[0][0];
    fullscreenCallback(true);
    expect(windowStats?.value.isFullscreen).toBe(true);
  });
});
