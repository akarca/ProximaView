const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onLoadModel: (callback) => {
    ipcRenderer.on("load-model-file", (event, filePath) => {
      callback(filePath);
    });
  },
  exportAnimation: (data) =>
    ipcRenderer.send("export-animation-sequence", data),

  onExportFeedback: (callback) =>
    ipcRenderer.on("export-feedback", (event, feedback) => callback(feedback)),
});
