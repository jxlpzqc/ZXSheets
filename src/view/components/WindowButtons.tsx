import { getTheme, IButtonStyles, IconButton, Stack } from '@fluentui/react';
import * as React from 'react';
import { ipcRenderer } from 'electron'
import { connect } from 'react-redux';
import { RootState } from '../store/state';

export interface IWindowButtonsProps {
  isStageOpen?: boolean;
  disabledClose?: boolean;
  disabledMaximumOrRestore?: boolean;
  disabledMinimum?: boolean;
}

function WindowButtons(props: IWindowButtonsProps) {

  const theme = getTheme();
  const fontColor = props.isStageOpen ? theme.palette.black : theme.palette.white;
  const btnStyle: IButtonStyles = {
    root: {
      height: 32,
      width: 46,
      color: fontColor
    },
    icon: {
      fontSize: 12
    },
    rootHovered: {
      background: props.isStageOpen ? theme.palette.neutralLight : theme.palette.themeDark,
      color: fontColor
    },
    rootPressed: {
      background: props.isStageOpen ? theme.palette.neutralQuaternary : theme.palette.themeDarker,
      color: fontColor
    }
  };

  const closeBtnStyle: IButtonStyles = {
    ...btnStyle,
    rootHovered: {
      background: theme.palette.red,
      color: theme.palette.white
    },
    rootPressed: {
      background: theme.palette.redDark,
      color: theme.palette.white
    }
  }

  const ipc = ipcRenderer;

  const minimizeBtnOnClick = () => {
    ipc.send("main-window-minimize");
  };

  const maximizeBtnOnClick = () => {
    ipc.send("main-window-maximize");
  };

  // listen for window state change
  const [maximized, setMaximized] = React.useState<boolean>(false);

  React.useEffect(() => {
    ipc.on("main-window-maximized-changed", (e, state) => {
      setMaximized(state);
    });
  }, []);

  const closeBtnOnClick = () => {
    ipc.send("main-window-close");
  };

  return (
    <Stack horizontal >
      <IconButton styles={btnStyle} iconProps={{
        iconName: 'ChromeMinimize'
      }}
        onClick={minimizeBtnOnClick}
        disabled={props.disabledMinimum} />
      <IconButton styles={btnStyle} iconProps={maximized ? {
        iconName: 'ChromeRestore'
      } : {
        iconName: 'Stop'
      }}
        onClick={maximizeBtnOnClick}
        disabled={props.disabledMaximumOrRestore} />
      <IconButton styles={closeBtnStyle} iconProps={{
        iconName: 'ChromeClose'
      }}
        onClick={closeBtnOnClick}
        disabled={props.disabledClose} />

    </Stack >
  );
}

export default connect((state: RootState) => ({
  isStageOpen: state.ribbon.backStageOpend
}))(WindowButtons);