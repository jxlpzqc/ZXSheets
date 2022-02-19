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

/**
 * Returns zoom value
 * @param v value ranges from -100 to 100
 */
function sliderValueToZoom(v: number): number {
  if (v >= 0) {
    return v / 100 * (4 - 1) + 1;
  }
  else {
    return 1 + v / 100 * (1 - 0.1);
  }

}

/**
 * Returns slider value
 * @param v value ranges from 0 to 4
 */
function zoomToSliderValue(v: number): number {
  if (v >= 1) {
    return (v - 1) / (4 - 1) * 100;
  }
  else {
    return (v - 1) / (1 - 0.1) * 100;
  }
}

const StatusBar: React.FunctionComponent<IStatusBarProps> = ({
  desc, progress, view = 'default', zoom, onzoom
}) => {

  const theme = getTheme();
  const sliderStyle: Partial<ISliderStyles> = {
    thumb: {
      background: theme.palette.neutralPrimary,
      width: '8px',
      height: '16px',
      border: 0,
      borderRadius: 0
    },
    slideBox: {
      height: '16px'
    },
    zeroTick: {
      background: theme.palette.neutralPrimary,
      height: 8,
      transform: "translateY(-2px)"
    },
    lineContainer: {
      background: theme.palette.neutralDark
    },
  }

  const btnStyle: IButtonStyles = {
    root: {
      height: 20,
      width: 50,
      color: theme.palette.black
    }
  };

  const zoomPlus = () => {
    let z = Math.floor(zoom * 10 + 1) / 10;
    if (z > 4) z = 4;
    onzoom(z);
  }

  const zoomMinus = () => {
    let z = Math.floor(zoom * 10 - 1) / 10;
    if (z < 0.1) z = 0.1;
    onzoom(z);
  }

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
            onClick={zoomMinus} />

          <Stack.Item grow align='center'>
            <Slider
              value={zoomToSliderValue(zoom)}
              onChange={(value) => { onzoom(sliderValueToZoom(value)) }}
              styles={sliderStyle} min={-100} max={100} showValue={false} originFromZero />
          </Stack.Item>
          <IconButton styles={btnStyle} size={10} iconProps={{
            iconName: 'Add'
          }} title="+" ariaLabel="+" disabled={false}
            onClick={zoomPlus} />
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <ActionButton onClick={() => { onzoom(1) }} styles={btnStyle} text={(zoom * 100).toFixed(0) + "%"} height={32} disabled={false} />
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
