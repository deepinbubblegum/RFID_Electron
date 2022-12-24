const { app, BrowserWindow } = require("electron");
const path = require("path");

var servicesWorker = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1270,
    height: 720,
    minWidth: 1270,
    minHeight: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // win.webContents.openDevTools();
  win.loadFile("ui/index.html");
}

app.whenReady().then(() => {
  servicesWorker = require('child_process').spawn('python', ['./services/services.py']);
  // show output from services.py
  servicesWorker.stdout.on('data', function (data) {
    console.log("data: ", data.toString('utf8'));
  });
  servicesWorker.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`); // when error
  });

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
  // kill services.py
  servicesWorker.kill('SIGINT');
});
