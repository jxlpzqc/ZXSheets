import { getTheme } from '@fluentui/react'
import React from 'react'

interface IThumbProps {
  orientation: 'horizontal' | 'vertical',
  /**
   * between 0 and 1
   */
  length: number
}


export default function Thumb({ orientation, length }: IThumbProps) {
  if (length < 0.1) length = 0.1;
  if (length > 0.9) length = 0.9;

  const { palette } = getTheme();
  const thumbStyle: React.CSSProperties = {
    background: palette.white,
    border: `1px solid ${palette.neutralSecondary}`,
    boxSizing: 'border-box'
  }

  if (orientation == 'horizontal') {
    thumbStyle.width = `${length * 100}%`;
    thumbStyle.height = '100%';
  }
  else {
    thumbStyle.height = `${length * 100}%`;
    thumbStyle.width = '100%';
  }

  return (
    <div style={thumbStyle}></div>
  )
}