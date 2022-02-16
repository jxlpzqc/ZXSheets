import { getTheme, Stack } from '@fluentui/react';
import React from 'react'
import Thumb from './Thumb';

type ITrackProps = {
  orientation: 'horizental' | 'vertical';
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
    background: palette.neutralLighter
  }



  return (
    <div style={trackStyle}>
      <Stack horizontal={props.orientation === 'horizental'}>
        <div onClick={props.onPageUp}></div>
        <Thumb orientation={props.orientation} length={props.length}></Thumb>
        <div onClick={props.onPageDown}></div>
      </Stack>

    </div>
  )
}