
import React from 'react'

let lid = 0;
export class Dialog {

  constructor(
    public id: string = "",
    public className: string = "",
    public content: React.ReactNode
  ) {
    if (!id) this.id = 'l' + (lid++);

  }

  show() {
    
  }

  hide() {

  }

  close() {

  }


}



type DialogProps = {
  show: boolean;
  height: number;
  width: number;
  id: string;
  dialogClass: string;
}

const dialogComponent: React.FC<DialogProps> = (prop) => {

  prop.children
  return (<></>)
}

export default dialogComponent;
