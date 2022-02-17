import styles from './index.module.css'
import React, { Component } from 'react'
// import { detectBlur } from '../helpers'
import PropTypes from 'prop-types'
import { RibbonPalette } from '../RibbonPalette';


export interface IDropDownWithSmallImageProps {
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

export default class DropDownWithSmallImage extends Component<IDropDownWithSmallImageProps> {

  static defaultProps: IDropDownWithSmallImageProps;

  shouldComponentUpdate (nextProps:IDropDownWithSmallImageProps) {
    let prevString = JSON.stringify(this.props)
    let nextString = JSON.stringify(nextProps)
    return prevString !== nextString
  }
  
  render() {
    // @ts-ignore
    window.ribbonitem += 1

    const palette = this.props.palette
    const children = React.Children.map(this.props.children,
      (child:any) => React.cloneElement(child, child.props.hasOwnProperty('palette') ? {palette} : undefined)
    )

    let isVisible = this.props.visible
    let isEnable = this.props.enabled
    let isActive = this.props.active
    const backgroundImage = 'url(' + this.props.image + ')'

    const events = this.props.events

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.dropDown + ' ' + (isActive ? styles.active : '') + ' ' + (isEnable ? '' : styles.enable)}
           tabIndex={-1}
        {...events}>
        <div className={styles.image} style={{backgroundImage}}>
        </div>
        <div className={styles.arrow}>
        </div>
        <div className={styles.list} style={isActive ? {display: 'block'} : {display: 'none'}}>
          {children}
        </div>
      </div>
    )
  }
}


DropDownWithSmallImage.defaultProps = {
  visible: true,
  enabled: true,
  active: false,
  image: '',
  events: {},
  palette: {},
}
