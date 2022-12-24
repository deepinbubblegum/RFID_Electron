const { app, BrowserWindow } = require("electron");
const path = require("path");

var servicesWorker = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();
  win.loadFile("ui/index.html");
}

app.whenReady().then(() => {
  servicesWorker = require('child_process').spawn('python', ['./services/services.py']);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
  
  console.log("stopping services");
  servicesWorker.kill('SIGINT');
});
