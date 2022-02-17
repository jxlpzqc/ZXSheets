import styles from './index.module.css'
import React, { Component } from 'react'
import { RibbonPalette } from './RibbonPalette';

interface IDropDownProps{
  text: string,
  width: number,
  visible: boolean,
  enabled: boolean,
  image: string,
  active: boolean,
  events: React.AllHTMLAttributes<HTMLDivElement>,
  palette: RibbonPalette,
}

export default class DropDown extends Component<IDropDownProps> {
  static defaultProps: IDropDownProps;
  shouldComponentUpdate(nextProps: IDropDownProps) {
    const prevString = JSON.stringify(this.props)
    const nextString = JSON.stringify(nextProps)
    return prevString !== nextString
  }
  
  render() {
    // @ts-ignore
    window.ribbonitem += 1
    const palette = this.props.palette
    const children = React.Children.map(this.props.children,
      (child:any) => React.cloneElement(child, child.props.hasOwnProperty('palette') ? {palette} : undefined)
    )

    const isVisible = this.props.visible
    const isEnable = this.props.enabled
    const isActive = this.props.active
    const width = this.props.width
    const text = this.props.text

    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.dropDown + ' ' + (isActive ? styles.active : '')}
        style={{width}}
        {...events}>
        <div className={styles.text}>
          {text}
        </div>
        <div className={styles.list} style={isActive ? {display: 'block'} : {display: 'none'}}>
          {children}
        </div>
      </div>
    )
  }
}

DropDown.defaultProps = {
  text: '',
  width: 26,
  visible: true,
  enabled: true,
  active: false,
  image: '',
  events: {},
  palette: {},
}
