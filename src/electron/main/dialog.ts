import { BrowserWindow, ipcMain, IpcMainEvent, ipcRenderer } from "electron";
import { ElectronDialog } from '../renderer/ElectronDialog'
import { mainWindow } from ".";

const dialogWindows: { [key: string]: BrowserWindow } = {};


export function registDialogWindowEvent() {
  ipcMain.on('create-dialog', async (e: IpcMainEvent, dialog: ElectronDialog) => {

    const parent: BrowserWindow | undefined = BrowserWindow.fromWebContents(e.sender) ?? mainWindow ?? undefined;

    const dialogWin = new BrowserWindow({
      height: dialog.height,
      width: dialog.width,
      modal: dialog.modal,
      minimizable: false,
      maximizable: false,
      parent,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });

    await dialogWin.loadURL("http://localhost:8080/dialog.html");
    await dialogWin.webContents.executeJavaScript(`window.__dialogID=${dialog.id}`);

    dialogWin.webContents.send("dialog-render", dialog.id, dialog.content);

    dialogWindows[dialog.id] = dialogWin;
  })


  ipcMain.on('update-dialog', async (e: IpcMainEvent, dialog: ElectronDialog) => {

    const dialogWin = dialogWindows[dialog.id];
    dialogWin?.webContents.send("dialog-render", dialog.id, dialog.content);

  })

  ipcMain.on('close-dialog', async (e: IpcMainEvent, id: string) => {
    const dialogWin = dialogWindows[id];
    dialogWin?.close();
    // GC Collect
    delete dialogWindows[id];
  })

}


