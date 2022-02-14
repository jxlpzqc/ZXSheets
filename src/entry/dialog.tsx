import ReactDOM from "react-dom";


import { initializeIcons } from '@fluentui/font-icons-mdl2';
import React from "react";
import { ipcRenderer, IpcRendererEvent } from "electron";

initializeIcons();


ipcRenderer.on('dialog-render', (e: IpcRendererEvent, dialogID: string, dom: React.ReactDOM) => {
  // @ts-ignore
  if(window.__dialogID == dialogID)
    ReactDOM.render(<>{dom}</>, document.getElementById('app'));
})
