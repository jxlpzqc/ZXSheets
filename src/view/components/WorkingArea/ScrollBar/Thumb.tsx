import { getTheme } from '@fluentui/react'
import React from 'react'

interface IThumbProps {
  orientation: 'horizental' | 'vertical',
  /**
   * between 0 and 1
   */
  length: number
}


export default function Thumb({ orientation, length }: IThumbProps) {
  const { palette } = getTheme();
  const thumbStyle: React.CSSProperties = {
    background: palette.white,
    border: `1px solid ${palette.black}`
  }

  if (orientation == 'horizental') {
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