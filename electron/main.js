import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#0f0f0f', // Black background matching your color palette
  });

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  
  // Open DevTools in development
//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.webContents.openDevTools();
//   }
};

// Create window when Electron is ready
app.whenReady().then(() => {
  createWindow();

  // On macOS, recreate window when dock icon is clicked and no windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});