import styles from './ButtonWithLargeImageWithText.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const mock = () => { }

export interface IButtonWithLargeImageWithText {
  font?: string,
  text?: string,
  visible?: boolean,
  enabled?: boolean,
  image?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}



export default class ButtonWithLargeImageWithText extends Component<IButtonWithLargeImageWithText> {
  static defaultProps: IButtonWithLargeImageWithText;

  shouldComponentUpdate(nextProps: IButtonWithLargeImageWithText) {
    const prevString = JSON.stringify(this.props)
    const nextString = JSON.stringify(nextProps)
    return prevString !== nextString
  }

  render() {
    const isVisible = this.props.visible
    const isEnable = this.props.enabled
    const font = this.props.font
    const text = this.props.text
    const backgroundImage = 'url(' + this.props.image + ')'
    let onClick

    onClick = isEnable ? this.props.onClick : mock

    if (!isVisible)
      return null
    return (
      <div className={styles.button} style={{ font }} onClick={onClick}>
        <div className={styles.image} style={{ backgroundImage }}>
        </div>
        <div className={styles.name}>
          {text}
        </div>
      </div>
    )
  }
}

ButtonWithLargeImageWithText.defaultProps = {
  text: '',
  visible: true,
  enabled: true,
  font: '',
  image: '',
  onClick: mock,
}
