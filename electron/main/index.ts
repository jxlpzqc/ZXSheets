import { app, BrowserWindow, ipcMain } from 'electron';
import { resolve } from 'path'

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win: BrowserWindow | undefined;

// 打开主窗口
function createWindow() {

  // TODO: change it with dev and publish
  const indexPageURL = `http://localhost:8080/`;
  const preloadScripts = resolve(__dirname, 'zxsheets.preload.js');

  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: false,
    webPreferences: {
      preload: preloadScripts,
    }
  });


  win.loadURL(indexPageURL);

  // 当 window 被关闭，这个事件会被触发
  win.on('closed', () => {
    // 取消引用 window 对象
    win = undefined
  })
  win.on('maximize', () => {
    win?.webContents.send("main-window-maximized-changed", true);
  })

  win.on('unmaximize', () => {
    win?.webContents.send("main-window-maximized-changed", false);
  })

}

ipcMain.on("main-window-close", () => {
  win?.close();
});

ipcMain.on("main-window-minimize", () => {
  win?.minimize();
});

ipcMain.on("main-window-maximize", () => {
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});


app.on('ready', createWindow)

// Close app when all window closed.
app.on('window-all-closed', () => {
  // Exclude macOS for command+Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})