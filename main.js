// 控制应用程序生命周期并创建本机浏览器窗口的模块
const {
  app,
  BrowserWindow,
  ipcMain,
  net,
  dialog
} = require('electron')
const path = require('path')
const electron = require('electron')
const Menu = electron.Menu


function createWindow() {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null)
  // 创建浏览器窗口
  // 创建主页面窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // alwaysOnTop: true,
    minWidth: 800,
    minHeight: 600,
    resizable:false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // 在此应用中加载'index.html'
  mainWindow.loadFile('index.html')
  
  // 打开DevTools。
  // mainWindow.webContents.openDevTools()
}

// Electron完成后将调用此方法
// 初始化并准备创建浏览器窗口
// 某些API仅在此事件发生后才能使用
app.whenReady().then(() => {
  createWindow()
  //异步请求北京时间API
  // const fetchDate = () => {
  //   return new Promise((resolve, reject) => {
  //     const request = net.request('http://quan.suning.com/getSysTime.do')

  //     request.on('response', (response) => {
  //       console.log(response.statusCode);
  //       console.log(response.headers);

  //       response.on('data', (chunk) => {
  //         let result = JSON.parse(chunk);
  //         let datetime = result.sysTime2;
  //         let date = datetime.substring(0, 10)
  //         console.log(result, datetime, date)
  //         resolve({
  //           datetime,
  //           date
  //         })
  //       })

  //       response.on('end', () => {
  //         console.log('end');

  //       })

  //     })
  //     request.end();
  //   })
  // }
  //每1秒请求一次
  // setInterval(() => {
  //   fetchDate().then((date) => {
  //     mainWindow.webContents.send('datetime', date) //发送数据给渲染进程
  //   })
  // }, 1000)

  app.on('activate', function () {
    // 在macOS上，通常会在单击停靠图标，并且没有其他窗口打开。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 关闭所有窗口时退出，但在macOS上除外。 在那里，很常见让应用程序及其菜单栏保持活动状态，直到用户使用Cmd + Q显式退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 在此文件中，您可以包括应用程序其他特定的主要流程代码。 您也可以将它们放在单独的文件中，并在此处要求它们。
ipcMain.on('time_message', (event, arg) => {
  console.log(arg)
  mainWindow.webContents.send('time_reply', arg);
})
ipcMain.on('min_time', (event, arg) => {
  console.log(arg)
  mainWindow.webContents.send('min_reply', arg);
})
ipcMain.on('step_value', (event, arg) => {
  console.log(arg)
  mainWindow.webContents.send('step_reply', arg);
})
ipcMain.on('dft', (event, arg) => {
  console.log(arg)
  mainWindow.webContents.send('dft_reply', arg);
})
ipcMain.on('white', (event, arg) => {
  console.log(arg)
  mainWindow.webContents.send('white_reply', arg);
})
ipcMain.on('gray', (event, arg) => {
  console.log(arg)
  mainWindow.webContents.send('gray_reply', arg);
})
ipcMain.on('temp1', (event, arg) => {
  console.log(arg)
  mainWindow.webContents.send('temp1_reply', arg);
})
ipcMain.on('temp2', (event, arg) => {
  console.log(arg)
  mainWindow.webContents.send('temp2_reply', arg);
})