import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export interface IButtonWithLargeImageWithTextProps{
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
   * url to image
   */
  image: string,
  /**
   * when true - button is pressed
   */
  active: boolean,
  /**
   * events of component
   */
  events: object,
  /**
   * object with color schema
   */
  palette: object,
}

export default class ButtonWithLargeImageWithText extends Component<IButtonWithLargeImageWithTextProps> {

  static defaultProps: IButtonWithLargeImageWithTextProps;
  shouldComponentUpdate(nextProps: IButtonWithLargeImageWithTextProps) {
    let prevString = JSON.stringify(this.props)
    let nextString = JSON.stringify(nextProps)
    return prevString !== nextString
  }

  render () {
    // const palette = this.props.palette
    // @ts-ignore
    window.ribbonitem += 1
    let isVisible = this.props.visible
    let isEnable = this.props.enabled
    let isActive = this.props.active
    const text = this.props.text
    const backgroundImage = 'url(' + this.props.image + ')'

    const events = this.props.events

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.button + ' ' + (isActive ? styles.active : '') + ' ' + (isEnable ? '' : styles.enable)}
        {...events}>
        <div className={styles.image} style={{backgroundImage}}>
        </div>
        <div className={styles.name}>
          <span dangerouslySetInnerHTML={{__html: text}}></span>
        </div>
      </div>
    )
  }
}


ButtonWithLargeImageWithText.defaultProps = {
  text: '',
  visible: true,
  enabled: true,
  active: false,
  image: '',
  events: {},
  palette: {},
}
