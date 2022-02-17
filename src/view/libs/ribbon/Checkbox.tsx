import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RibbonPalette } from './RibbonPalette'

export interface ICheckboxProps {
  // when false - component invisible
  visible: boolean,
  // when false - events inactive
  enabled: boolean,
  // when true - check box is checked
  checked: boolean,
  // check box label
  text: string,
  // events of component
  events: React.AllHTMLAttributes<HTMLDivElement>,
  // object with color schema
  palette: RibbonPalette,
}

export default class Checkbox extends Component<ICheckboxProps> {
  static defaultProps: ICheckboxProps;

  shouldComponentUpdate(nextProps: ICheckboxProps) {
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
    const isChecked = this.props.checked
    const text = this.props.text

    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.checkbox} {...events}>
        <input type="checkbox" id={text} checked={isChecked} disabled={!isEnable} readOnly={true} />
        <label>{text}</label>
      </div>
    )
  }
}


Checkbox.defaultProps = {
  visible: true,
  enabled: true,
  checked: false,
  text: '',
  events: {},
  palette: {},
}
