import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RibbonPalette } from './RibbonPalette'

interface IPictureBoxProps{
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
   * width of component in px
   */
  width: number,
  /**
   * height of component in px
   */
  height: number,
  /**
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette: RibbonPalette,
}

export default class PictureBox extends Component<IPictureBoxProps> {
  
  static defaultProps: IPictureBoxProps;
  render() {
    // const palette = this.props.palette

    const isVisible = this.props.visible
    const isEnable = this.props.enabled
    const backgroundImage = 'url(' + this.props.image + ')'
    const width = this.props.width + 'px'
    const height = this.props.height + 'px'

    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div style={{backgroundImage, width, height}} {...events} />
    )
  }
}


PictureBox.defaultProps = {
  visible: true,
  enabled: true,
  image: '',
  width: 40,
  height: 66,
  events: {},
  palette: {},
}
