import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

interface IPopupMenuProps {

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
   * events of component
   */
  events: object,
}

export default function PopupMenu(props: React.PropsWithChildren<IPopupMenuProps>) {
  const isEnable = props.enabled

  const events = isEnable ? props.events : {}

  return (
    <div className={styles.menu + ' ' + (isEnable ? '' : styles.enable)} {...events}>
      {props.children}
    </div>
  )
}


PopupMenu.defaultProps = {
  visible: true,
  enabled: true,
  active: false,
  events: {},
}
