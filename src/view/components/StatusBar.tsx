import { ActionButton, CommandBarButton, getTheme, IButtonStyles, IconButton, ISliderStyleProps, ISliderStyles, IStyleFunctionOrObject, Slider, Stack } from '@fluentui/react';
import * as React from 'react';
import { LayoutContainer } from '../layout/LayoutContainer';

interface IStatusBarProps {
  desc: string;
  progress?: number;
  view: string;
  zoom: number;
  onzoom: (zoom: number) => void;
}

const StatusBar: React.FunctionComponent<IStatusBarProps> = ({
  desc, progress, view = 'default', zoom
}) => {

  const theme = getTheme();
  const sliderStyle: IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles> = {
    thumb: {
      background: theme.palette.neutralDark,
      width: '8px',
      height: '16px',
      borderRadius: 0
    },
    slideBox: {
      height: '16px'
    }
  }

  const btnStyle: IButtonStyles = {
    root: {
      height: 20,
      color: theme.palette.black
    }
  };

  return (
    <Stack styles={{
      root: {
        background: theme.palette.neutralLighter,
        borderTop: '1px solid ' + theme.palette.neutralQuaternary
      }
    }} horizontal verticalAlign='center'>
      <Stack.Item grow>
        <div style={{
          padding: '2px 5px'
        }}>
          {desc}
        </div>

      </Stack.Item>
      <Stack.Item styles={{
        root: {
          width: "200px"
        }
      }}>
        <Stack horizontal>
          <IconButton styles={btnStyle} size={10} iconProps={{
            iconName: 'Remove'
          }} title="-" ariaLabel="-" disabled={false} />

          <Stack.Item grow align='center'>
            <Slider styles={sliderStyle} min={-10} max={10} showValue={false} />
          </Stack.Item>
          <IconButton styles={btnStyle} size={10} iconProps={{
            iconName: 'Add'
          }} title="+" ariaLabel="+" disabled={false} />
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <ActionButton styles={btnStyle} text={(zoom * 100).toString() + "%"} height={32} disabled={false} />
      </Stack.Item>
    </Stack>

  )
};

export default StatusBar;
