import { contextBridge, ipcRenderer as ipc } from 'electron'
import { IPreloadObject } from './IPreloadObject'

// function warn() {
//   console.warn('[Electron Preload] Do not direct send or bind message!')
// }

const preload: IPreloadObject = {
  closeMainWindow (): void {
    ipc.send("main-window-close");
  },
  maximizeOrRestoreMainWindow (): void {
    ipc.send("main-window-maximize");
  },
  minimizeMainWindow (): void {
    ipc.send("main-window-minimize");
  },
  bindWindowMaximizedChange (event: (maximized: boolean) => void): void {
    ipc.on("main-window-maximized-changed", (e, state) => {
      event(state);
    });
  },
};

contextBridge.exposeInMainWorld('ElectronPreload', preload);