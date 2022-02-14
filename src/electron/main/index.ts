import { app, BrowserWindow, ipcMain } from 'electron';
import { registDialogWindowEvent } from './dialog';

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
export let mainWindow: BrowserWindow | null = null;

// 打开主窗口
function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // 加载应用的 index.html
    // const indexPageURL = `file://${__dirname}/dist/index.html`;
    const indexPageURL = `http://localhost:8080`;

    mainWindow.loadURL(indexPageURL);

    // 当 window 被关闭，这个事件会被触发
    mainWindow.on('closed', () => {
        // 取消引用 window 对象
        mainWindow = null
    })
    mainWindow.on('maximize', (e: Event, s: boolean) => {
        mainWindow?.webContents.send("main-window-maximized-changed", true);
    })

    mainWindow.on('unmaximize', () => {
        mainWindow?.webContents.send("main-window-maximized-changed", false);
    })


}

registMainWindowButtonsAction()
registDialogWindowEvent();

// Electron 会在创建浏览器窗口时调用这个函数。
app.on('ready', createWindow);

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出
    // 否则绝大部分应用会保持激活
    if (process.platform !== 'darwin') {
        app.quit()
    }
});


function registMainWindowButtonsAction() {

    ipcMain.on("main-window-close", () => {
        mainWindow?.close();
    });

    ipcMain.on("main-window-minimize", () => {
        mainWindow?.minimize();
    });

    ipcMain.on("main-window-maximize", () => {
        if (mainWindow?.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow?.maximize();
        }
    });

}