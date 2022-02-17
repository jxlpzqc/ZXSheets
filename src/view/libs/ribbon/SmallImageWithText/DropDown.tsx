import styles from './index.module.css'
import React, { ReactElement, useState } from 'react'
import PropTypes from 'prop-types'
import { RibbonPalette } from '../RibbonPalette'

interface IDropDownWithSmallImageWithText {

  /**
   * text near the icon
   */
  text: string,
  /**
   * when false - component invisible
   */
  visible: boolean,
  /**
   * when false - events inactive
   */
  enabled: boolean,
  /**
   * url to image
   */
  image: string,
  /**
   * when true - dropdown list is open
   */
  active: boolean,
  /**
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette: RibbonPalette,
  children: ReactElement | ReactElement[]
}

export default function DropDownWithSmallImageWithText(props: IDropDownWithSmallImageWithText) {
  // shouldComponentUpdate (nextProps) {
  //   let prevString = JSON.stringify(this.props)
  //   let nextString = JSON.stringify(nextProps)
  //   return prevString !== nextString
  // }

  // @ts-ignore
  window.ribbonitem += 1

  const [isActive, setIsActive] = useState(false)

  const palette = props.palette
  const children = React.Children.map(props.children,
    (child) => React.cloneElement(child, child.props.hasOwnProperty(palette) ? { palette } : undefined)
  )

  const isVisible = props.visible
  const isEnable = props.enabled
  const text = props.text
  const backgroundImage = 'url(' + props.image + ')'

  const events = props.events

  if (!isVisible) {
    return null
  }
  return (
    <div className={styles.dropDown + ' ' + (isActive ? styles.active : '') + ' ' + (isEnable ? '' : styles.enable)}
      tabIndex={-1}
      onBlur={() => {
        setIsActive(false)
      }} >
      <div onClick={() => {
        setIsActive(true)
      }}
      {...events}>
        <div className={styles.image} style={{ backgroundImage }} >
        </div>
        <div className={styles.text}>
          {text}
        </div>
      </div>

      {isActive && <div className={styles.list}
        onClick={() => {
          setIsActive(false)
        }}>
        {children}
      </div>}
    </div>
  )
}

DropDownWithSmallImageWithText.defaultProps = {
  text: '',
  visible: true,
  enabled: true,
  active: false,
  image: '',
  events: {},
  palette: {},
}
