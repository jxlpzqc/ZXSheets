import Actions from '@/view/store/actions';
import { ActionButton, getTheme, IButtonStyles, IconButton, ISliderStyleProps, ISliderStyles, IStyleFunctionOrObject, Slider, Stack } from '@fluentui/react';
import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { RootState } from '../store/state';

interface IStatusBarProps {
  desc?: string;
  progress?: number | "none" | "indeterminate";
  view: string;
  zoom: number;
  onzoom: (zoom: number) => void;
}

const StatusBar: React.FunctionComponent<IStatusBarProps> = ({
  desc, progress, view = 'default', zoom, onzoom
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
          }} title="-" ariaLabel="-" disabled={false}
            onClick={() => { onzoom(zoom - 0.1) }} />

          <Stack.Item grow align='center'>
            <Slider value={zoom} styles={sliderStyle} min={0.2} max={5} showValue={false} />
          </Stack.Item>
          <IconButton styles={btnStyle} size={10} iconProps={{
            iconName: 'Add'
          }} title="+" ariaLabel="+" disabled={false}
            onClick={() => { onzoom(zoom + 0.1) }} />
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <ActionButton styles={btnStyle} text={(zoom * 100).toFixed(0) + "%"} height={32} disabled={false} />
      </Stack.Item>
    </Stack>

  )
};


const mapStateToProps = (state: RootState) => ({
  desc: state.status.desc,
  progress: state.status.progress,
  zoom: state.view.zoom,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onzoom: (zoom: number) => {
    dispatch(Actions.view.changeZoom(zoom));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)
