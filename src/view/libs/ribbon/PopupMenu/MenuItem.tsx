import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export interface IMenuItemProps {

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
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>,

  onClick?: () => void;
}

export default function MenuItem(props: IMenuItemProps) {
  const isVisible = props.visible
  const isEnable = props.enabled
  const text = props.text
  const hotKey = props.hotKey
  const backgroundImage = 'url(' + props.image + ')'

  return (
    <div className={styles.menuItem + ' ' + (isEnable ? '' : styles.enable)}
      onMouseDown={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}>
      {props.image && <div className={styles.image} style={{ backgroundImage }} />}
      <div className={styles.text} style={{ marginLeft: !props.image ? '10px' : '' }}>
        {text}
      </div>
      <div className={styles.hotKey}>
        {hotKey}
      </div>
      <div className={styles.arrow} style={{ visibility: 'hidden' }} />
    </div>
  )
}


MenuItem.defaultProps = {
  visible: true,
  enabled: true,
  text: '',
  hotKey: '',
  image: '',
  events: {},
}
