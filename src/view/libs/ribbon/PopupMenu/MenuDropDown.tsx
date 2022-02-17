import styles from './index.module.css'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export interface IMenuDropDownProps {

  /**
   * name of menu item
   */
  text: string,
  /**
   * text in right part of menu item
   */
  hotKey: string,
  /**
   * url to image
   */
  image: string,
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
  children: React.ReactElement | React.ReactElement[],
  /**
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>,
}

export default function MenuDropDown(props: IMenuDropDownProps) {
  // shouldComponentUpdate (nextProps) {
  //   let prevString = JSON.stringify(this.props)
  //   let nextString = JSON.stringify(nextProps)
  //   return prevString !== nextString
  // }

  const [isActive, setIsActive] = useState(false)

  const isEnable = props.enabled
  const text = props.text
  const hotKey = props.hotKey
  const backgroundImage = 'url(' + props.image + ')'

  const events = isEnable ? props.events : {}

  // stop event propogation for click
  if (events.onClick) {
    let click = events.onClick;

    events.onClick = (e) => {
      e.stopPropagation();
      click(e);
    }
  }

  return (
    <div className={styles.menuItem + ' ' + (isEnable ? '' : styles.enable)} {...events}>
      <div className={styles.menuItem} style={{ width: '100%' }}
        onClick={(e) => {
          e.stopPropagation()
          setIsActive(true)
        }}
        onBlur={() => {
          setIsActive(false)
        }}>
        <div className={styles.image} style={{ backgroundImage }} />
        <div className={styles.text}>
          {text}
        </div>
        <div className={styles.hotKey}>
          {hotKey}
        </div>

        <div className={styles.arrow} style={{ textAlign: 'right', paddingRight: '1em' }} />
      </div>

      {isActive && <div className={styles.submenu} onClick={(e) => {
        debugger
        setIsActive(false)
      }}>
        {props.children}
      </div>}
    </div>
  )
}

MenuDropDown.defaultProps = {
  visible: true,
  enabled: true,
  active: false,
  text: '',
  hotKey: '',
  image: '',
  events: {},
}
