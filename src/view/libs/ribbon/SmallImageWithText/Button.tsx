import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RibbonPalette } from '../RibbonPalette'

interface IButtonWithSmallImageWithTextProps {

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
}

export default class ButtonWithSmallImageWithText extends Component<IButtonWithSmallImageWithTextProps> {

  static defaultProps: IButtonWithSmallImageWithTextProps;

  shouldComponentUpdate(nextProps: IButtonWithSmallImageWithTextProps) {
    const prevString = JSON.stringify(this.props)
    const nextString = JSON.stringify(nextProps)
    return prevString !== nextString
  }

  render() {
    // const palette = this.props.palette
    // @ts-ignore
    window.ribbonitem += 1

    const isVisible = this.props.visible
    const isEnable = this.props.enabled
    const isActive = this.props.active
    const text = this.props.text
    const backgroundImage = 'url(' + this.props.image + ')'
    
    const events = this.props.events

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.button + ' ' + (isActive ? styles.active : '') + ' ' + (isEnable ? '' : styles.enable)}
        {...events}>
        <div className={styles.image} style={{ backgroundImage }}>
        </div>
        <div className={styles.text}>
          {text}
        </div>
      </div>
    )
  }
}

ButtonWithSmallImageWithText.defaultProps = {
  text: '',
  visible: true,
  enabled: true,
  active: false,
  image: '',
  events: {},
  palette: {},
}
