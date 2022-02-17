import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export interface IMenuSeparatorProps {

  /**
   * text in the separator
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
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>
}

export default class MenuSeparator extends Component<IMenuSeparatorProps> {

  static defaultProps: IMenuSeparatorProps;

  shouldComponentUpdate(nextProps: IMenuSeparatorProps) {
    let prevString = JSON.stringify(this.props)
    let nextString = JSON.stringify(nextProps)
    return prevString !== nextString
  }

  render() {
    const isVisible = this.props.visible
    const isEnable = this.props.enabled
    const text = this.props.text

    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.separator + ' ' + (isEnable ? '' : styles.enable)} {...events} >
        <div className={styles.text}>
          {text}
        </div>
      </div>
    )
  }
}


MenuSeparator.defaultProps = {
  visible: true,
  enabled: true,
  text: '',
  events: {},
}
