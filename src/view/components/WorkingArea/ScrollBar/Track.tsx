import { getTheme, Stack } from '@fluentui/react';
import React from 'react'
import Thumb from './Thumb';
import classnames from './index.module.css'

type ITrackProps = {
  orientation: 'horizontal' | 'vertical';
  /**
   * A number between 0 and 1 indicating scrollbar position.
   */
  offset: number;
  /**
   * A number between 0 and 1 indicating scrollbar length.
   */
  length: number;
  /**
   * Event when offset change.
   */
  onMove(offset: number): void;
  /**
   * Event when click track area for.
   */
  onPageUp(): void;
  onPageDown(): void;
};


export default function Track(props: ITrackProps) {

  const { palette } = getTheme();

  const trackStyle: React.CSSProperties = {
    background: palette.neutralQuaternary,
  }

  return (
    <div
      className={props.orientation == 'horizontal' ? classnames.horizontalTrack : classnames.verticalTrack}
      style={trackStyle}>
      <Stack styles={{
        root: {
          width: '100%',
          height: '100%'
        }
      }} horizontal={props.orientation === 'horizontal'}>
        <div onClick={props.onPageUp}></div>
        <Thumb orientation={props.orientation} length={props.length}></Thumb>
        <div onClick={props.onPageDown}></div>
      </Stack>

    </div>
  )
}