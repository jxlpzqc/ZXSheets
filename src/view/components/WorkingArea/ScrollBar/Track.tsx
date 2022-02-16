import { Stack } from '@fluentui/react';
import React from 'react'

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

  return (
    <Stack horizontal={props.orientation === 'horizental'}>
      <div></div>
      <div></div>
      <div></div>
    </Stack>
  )
}