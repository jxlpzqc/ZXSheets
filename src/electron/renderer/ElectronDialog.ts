import { ipcRenderer } from "electron";

// Dialog Mananer
type DialogManager = {
  [key: string]: ElectronDialog
}

export const dialogManager: DialogManager = {}


let lid = 0;

export class ElectronDialog {
  constructor(
    public content?: React.ReactNode,
    public id: string = "",
    public className: string = "",
    public height: number = 600,
    public width: number = 800,
    public modal: boolean = true
  ) {
    if (!id) this.id = 'l' + (lid++);
    
  }

  show() {
    console.log(this);
    
    ipcRenderer.send("create-dialog", this);
  }

  /**
   * Close a dialog. same as `ElectronDialog.close()`
   * @see ElectronDialog.close()
   */
  hide() {
    this.close();
  }

  close() {
    ipcRenderer.send('close-dialog', this);
  }

  render(content?: React.ReactNode) {
    this.content = content;
    ipcRenderer.send('update-dialog', this);
  }
}