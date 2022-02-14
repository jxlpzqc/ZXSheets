
import React, { createContext } from 'react'
import { isRunInElectron } from '../utils';
import { Dialog as FluentDialog } from '@fluentui/react';
import { ipcRenderer } from 'electron'
import { ElectronDialog, dialogManager as manager } from '../../electron/renderer/ElectronDialog';

type DialogProps = {
  show?: boolean;
  modal?: boolean;
  height?: number;
  width?: number;
  id: string;
  dialogClass?: string;
  onClose?: () => void;
}

const Dialog: React.FC<DialogProps> = (props) => {

  if (isRunInElectron()) {
    if (props.show) {
      let dialog;
      if (!!manager[props.id]) {
        dialog = manager[props.id];
        dialog.render(props.children);
      }
      else {
        dialog = new ElectronDialog(props.children, props.id, props.dialogClass, props.height, props.width, props.modal);
        dialog.show();
      }
    }
    else {
      if (!!manager[props.id]) {
        manager[props.id].hide();
      }
    }
    return (<></>)
  }
  else {
    return (
      <FluentDialog hidden={!props.show} minWidth={props.width}>
        {props.children}
      </FluentDialog>);
  }
}


export function CreateDialog<P>(component: React.FC<P>): React.FC<P | DialogProps> {


  if (isRunInElectron()) {
    return (prop) => {


      return <></>
    };
  }
  else {
    return (prop) => {
      return <></> 
    }
  }

}


export default Dialog;
