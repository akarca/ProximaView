const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("node:path");
const AdmZip = require("adm-zip");

if (require("electron-squirrel-startup")) {
  app.quit();
}

var mainWindow = null;
var file_path = "";
var app_ready = false;

function sendExportFeedback(success, message) {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send("export-feedback", { success, message });
  }
}

const createWindow = () => {
  if (mainWindow) {
    return;
  }
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      navigateOnDragDrop: true,
    },
  });

  mainWindow.webContents.on("did-finish-load", () => {
    if (file_path) {
      mainWindow.webContents.send("load-model-file", file_path);
      file_path = "";
    }
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  //mainWindow.webContents.openDevTools();
};

app.on("open-file", (event, path) => {
  event.preventDefault();
  if (!mainWindow) {
    file_path = path;
    if (app_ready) {
      createWindow();
    }
  } else {
    mainWindow.webContents.send("load-model-file", path);
  }

  if (mainWindow && !mainWindow.isVisible()) {
    mainWindow.show();
  }
});

app.whenReady().then(() => {
  app_ready = true;
  createWindow();

  app.on("activate", () => {
    createWindow();
  });
});

app.on("window-all-closed", () => {
  mainWindow = null;
  file_path = "";
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("export-animation-sequence", async (event, data) => {
  const { animationName, frames } = data;

  if (frames.length === 0) {
    sendExportFeedback(false, "No frames were captured for export.");
    return;
  }

  try {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: "Save Animation Sequence",
      defaultPath: path.join(
        app.getPath("downloads"),
        `${animationName}_animation.zip`,
      ),
      filters: [{ name: "ZIP Archive", extensions: ["zip"] }],
    });

    if (canceled || !filePath) {
      sendExportFeedback(false, "Export cancelled by user.");
      return;
    }

    const zip = new AdmZip();

    frames.forEach((frame) => {
      const buffer = Buffer.from(frame.data, "base64");
      zip.addFile(frame.name, buffer);
    });

    zip.writeZip(filePath);

    sendExportFeedback(
      true,
      `Successfully exported ${frames.length} frames to ${path.basename(filePath)}!`,
    );
  } catch (error) {
    sendExportFeedback(
      false,
      `Export failed due to a file system error: ${error.message}`,
    );
  }
});
