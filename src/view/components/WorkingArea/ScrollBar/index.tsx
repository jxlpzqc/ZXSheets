import { connect } from 'react-redux'
import React from 'react'
import { RootState } from '@/view/store/state'
import { IButtonStyles, IconButton, IIconProps, Stack } from '@fluentui/react'
import Track from './Track'

type IScrollBarProps = {
  orientation: 'horizental' | 'vertical',
  total: number;
  current: number;
  currentPageSize: number;
}

export const ScrollBar: React.FC<IScrollBarProps> = (props) => {

  const horizental = (props.orientation === 'horizental');

  const lIcon: IIconProps = horizental ? {
    iconName: ''
  } : {
    iconName: ''
  };

  const rIcon: IIconProps = horizental ? {
    iconName: ''
  } : {
    iconName: ''
  };

  const scrollBarBtnStyles: IButtonStyles = {
    root: {

    }
  };

  const thumbLength = 0;
  const thumbOffset = 0;

  const onMove = (offset: number) => {
    
  }

  const onPageDown = () => {

  }

  const onPageUp = () => {

  }

  return (
    <Stack horizontal={horizental}>
      <IconButton iconProps={lIcon}></IconButton>
      <Track
        orientation={props.orientation}
        length={thumbLength}
        offset={thumbOffset}
        onMove={onMove}
        onPageDown={onPageDown}
        onPageUp={onPageUp}
      ></Track>
      <IconButton iconProps={rIcon}></IconButton>
    </Stack>

  )

}
