import styles from './index.module.css'
import React, { Component } from 'react'
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
   * when true - component is active
   */
  active: boolean,
  /**
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>
  ,
}

export default class MenuDropDown extends Component<IMenuDropDownProps> {

  static defaultProps: IMenuDropDownProps;

  shouldComponentUpdate(nextProps: IMenuDropDownProps) {
    let prevString = JSON.stringify(this.props)
    let nextString = JSON.stringify(nextProps)
    return prevString !== nextString
  }

  render() {
    const isVisible = this.props.visible
    const isEnable = this.props.enabled
    /**
   * const isActive = this.props.active
   */
    const text = this.props.text
    const hotKey = this.props.hotKey
    const backgroundImage = 'url(' + this.props.image + ')'

    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.menuItem + ' ' + (isEnable ? '' : styles.enable)} {...events} >
        <div className={styles.image} style={{ backgroundImage }} />
        <div className={styles.text}>
          {text}
        </div>
        <div className={styles.hotKey}>
          {hotKey}
        </div>
        <div className={styles.arrow} style={{ visibility: 'hidden' }} />
      </div>
    )
  }
}

MenuDropDown.defaultProps = {
  visible: true,
  enabled: true,
  active: true,
  text: '',
  hotKey: '',
  image: '',
  events: {},
}

