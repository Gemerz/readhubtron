/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain, TouchBar } from 'electron';
import url from 'url';
import path from 'path';
import { autoUpdater } from 'electron-updater';
import Log from 'electron-log';
import Raven from 'raven-js';
import sourceMapSupport from 'source-map-support';
import MenuBuilder from './menu';


let mainWindow: ?BrowserWindow = null;

const { TouchBarButton, TouchBarSpacer } = TouchBar;

// Reel labels
const TopicButton = new TouchBarButton({
  label: ' 🎰 热门话题 ',
  backgroundColor: '#dddddd',
  click: () => {
    console.log('click');
    mainWindow.webContents.send('touchbar-click-reply', 'topic');
  }
});
const NewsButton = new TouchBarButton({
  label: ' 🎰 科技动态 ',
  backgroundColor: '#DCEDC5',
  click: () => {
    console.log('click');
    mainWindow.webContents.send('touchbar-click-reply', 'news');
  }
});
const TechButton = new TouchBarButton({
  label: ' 🎰 开发者资讯 ',
  backgroundColor: '#DCEDC8',
  click: () => {
    console.log('click');
    mainWindow.webContents.send('touchbar-click-reply', 'tech');
  }
});
const touchBar = new TouchBar([
  new TouchBarSpacer({ size: 'large' }),
  TopicButton,
  new TouchBarSpacer({ size: 'large' }),
  NewsButton,
  new TouchBarSpacer({ size: 'large' }),
  TechButton,
  new TouchBarSpacer({ size: 'large' }),
]);

ipcMain.removeAllListeners('ELECTRON_BROWSER_WINDOW_ALERT');
ipcMain.on('ELECTRON_BROWSER_WINDOW_ALERT', (event, message, title) => {
  console.warn(`[Alert] ** ${title} ** ${message}`);
  Raven.captureException(message);
  // event.returnValue = 0; // **IMPORTANT!**
});

if (process.env.NODE_ENV === 'production') {
  sourceMapSupport.install();
  Raven.config('https://111b51b49ee14feebcaada87b65b17eb@sentry.gemer.xyz/2')
    .install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const createWindow = () => {
  // Create the browser window.

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 768,
    transparent: true,
    titleBarStyle: 'hidden',
    vibrancy: 'dark',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      scrollBounce: true
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // mainWindow.loadURL(`file://${__dirname}/app.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  // // @TODO: Use 'ready-to-show' event
  // //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    // if (!menubar) {
    //   throw new Error('"menubar" is not defined');
    // }
    mainWindow.setTouchBar(touchBar);
    mainWindow.show();


    // mainWindow.focus();
  });


  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();


  if (process.env.NODE_ENV === 'production') {

    // autoUpdater.checkForUpdates()
  }
  if (process.platform === 'win32') {
    mainWindow.setMenu(null);
  }
};


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  try {
    const menubar = require('menubar')({
      index: `file://${__dirname}/setting.html`,
      icon: path.join(__dirname, 'menuIcon', 'menubarDefaultTemplate.png'),
      width: 250,
      height: 260,
      preloadWindow: true,
      transparent: true,
      resizable: false,
      minWidth: 250,
      // alwaysOnTop:true,
      showDockIcon: true
    });
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      menubar.window.openDevTools();
    }
  } catch (e) {
    Log.warn(e);
  }

  createWindow();

  // ipc
  ipcMain.on('apply-setting', (event, arg) => {
    if (arg === 'reload') {
      // mainWindow.webContents.reload();
      app.relaunch();
      app.exit();
    }
    if (arg === 'quit') {
      app.quit();
    }
  });

  ipcMain.on('apply-open-url', (event, arg) => {
    console.log(arg);
    require('electron').shell.openExternal(arg);
  });
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
    mainWindow.setTouchBar(touchBar);
  }
});

// check update
function sendStatusToWindow(text) {
  Log.info(text);
  mainWindow.webContents.send('message', text);
}

autoUpdater.logger = Log;
autoUpdater.logger.transports.file.level = 'info';
Log.info('App starting...');

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.');
  console.log(ev, info);
});
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.');
  console.log(ev, info);
});
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.');
  console.log(ev, err);
});
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('Download progress...');
  console.log(ev, progressObj);
});
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
  console.log(ev, info);
});
