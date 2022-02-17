import styles from './index.module.css'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { RibbonPalette } from '../RibbonPalette'

export interface IDropDownWithLargeImageWithTextProps {
  /**
   * text under the icon
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
   * when true - dropdown list is open
   */
  active: boolean,
  /**
   * url to image
   */
  image: string,
  /**
   * events of component
   */

  children: React.ReactElement | React.ReactElement[],
  events: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette: RibbonPalette,
}
export default function DropDownWithLargeImageWithText(props: IDropDownWithLargeImageWithTextProps) {
  const palette = props.palette

  const [isActive, setIsActive] = useState(false)

  const children = React.Children.map(props.children,
    (child) => React.cloneElement(child, child.props.hasOwnProperty('palette') ? { palette } : undefined)
  )

  let isEnable = props.enabled
  let text = props.text
  const backgroundImage = 'url(' + props.image + ')'

  if (text.indexOf('<br>') === -1) {
    text += '<br>'
  }

  let events = props.events

  return (
    <div className={styles.button + ' ' + (isActive ? styles.active : '') + ' ' + (isEnable ? '' : styles.enable)}
      onBlur={() => {
        setIsActive(false)
      }}
      onClick={() => {
        setIsActive(true)
      }}
      tabIndex={-1} {...events}>
      <div className={styles.image} style={{ backgroundImage }}>
      </div>
      <div className={styles.name}>
        <span dangerouslySetInnerHTML={{ __html: text }}></span>
        <div className={styles.icon}></div>
      </div>
      {isActive && <div className={styles.list}
        onClick={(e) => {
          e.stopPropagation()
          setIsActive(false)
        }}>
        {children}
      </div>}
    </div>
  )
}



DropDownWithLargeImageWithText.defaultProps = {
  text: '',
  visible: true,
  enabled: true,
  active: false,
  image: '',
  events: {},
  palette: {},
}
