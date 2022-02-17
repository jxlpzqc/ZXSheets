import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RibbonPalette } from './RibbonPalette'

interface ISeparatorProps {
  // when false - component invisible
  visible: boolean,
  // when false - events inactive
  enabled: boolean,
  // events of component
  events: React.AllHTMLAttributes<HTMLDivElement>,
  // object with color schema
  palette: RibbonPalette,
}


export default class Separator extends Component<ISeparatorProps> {

  static defaultProps: ISeparatorProps;

  shouldComponentUpdate(nextProps: ISeparatorProps) {
    const prevString = JSON.stringify(this.props)
    const nextString = JSON.stringify(nextProps)
    return prevString !== nextString
  }

  render() {
    // const palette = this.props.palette

    const isVisible = this.props.visible
    const isEnable = this.props.enabled

    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.separator} {...events}></div>
    )
  }
}


Separator.defaultProps = {
  visible: true,
  enabled: true,
  events: {},
  palette: {},
}
