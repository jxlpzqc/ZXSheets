import { connect } from 'react-redux'
import React from 'react'
import { RootState } from '@/view/store/state'
import { getTheme, IButtonStyles, IconButton, IIconProps, Stack } from '@fluentui/react'
import Track from './Track'
import classnames from './index.module.css'

type IScrollBarProps = {
  orientation: 'horizontal' | 'vertical',
  total: number;
  current: number;
  currentPageSize: number;
}

export const ScrollBar: React.FC<IScrollBarProps> = (props) => {

  const horizental = (props.orientation === 'horizontal');

  const lIcon: IIconProps = horizental ? {
    iconName: 'CaretSolidLeft'
  } : {
    iconName: 'CaretSolidUp'
  };

  const rIcon: IIconProps = horizental ? {
    iconName: 'CaretSolidRight'
  } : {
    iconName: 'CaretSolidDown'
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

  const { palette } = getTheme();

  const buttonStyles: IButtonStyles = {
    root: {
      height: '16px',
      width: '16px',
      border: `1px solid ${palette.neutralSecondary}`,
      borderRadius: 0,
      background: palette.white
    },
    icon: {
      fontSize: '8px',
      lineHeight: '16px',
      color: palette.black
    }
  }

  return (
    <Stack className={classnames.root} styles={{
      root: {
        background: palette.neutralLight
      }
    }} horizontal={horizental}>
      <IconButton iconProps={lIcon} styles={buttonStyles}></IconButton>
      <Track
        orientation={props.orientation}
        length={thumbLength}
        offset={thumbOffset}
        onMove={onMove}
        onPageDown={onPageDown}
        onPageUp={onPageUp}
      ></Track>
      <IconButton iconProps={rIcon} styles={buttonStyles}></IconButton>
    </Stack>

  )

}
