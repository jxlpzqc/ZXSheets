import styles from './index.module.css'
import React, { Component } from 'react'
import RibbonRow from './Row'
import PropTypes from 'prop-types'
import { RibbonPalette } from './RibbonPalette'

export interface IRibbonGroupProps {
  /**
   * group name
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
   * when true - popup is shown
   */
  active: boolean,
  popup?: React.ReactElement | React.ReactElement[],
  /**
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette?: RibbonPalette,
}

export default class RibbonGroup extends Component<IRibbonGroupProps> {
  static defaultProps: IRibbonGroupProps;
  render() {
    const palette = this.props.palette
    const children = React.Children.map(this.props.children,
      (child: any) => React.cloneElement(child, child.props.hasOwnProperty(palette) ? { palette } : undefined)
    )
    const popup = this.props.popup

    const isVisible = this.props.visible
    const isEnable = this.props.enabled
    const isActive = this.props.active
    const text = this.props.text

    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.group}>
        <div className={styles.content}>
          <RibbonRow>
            {children}
          </RibbonRow>
        </div>
        <div className={styles.name}>
          {text}
          <div className={styles.groupIcon + ' ' + (isEnable ? '' : styles.enable)} {...events} >
            <div className={styles.groupList} style={isActive ? { display: 'block' } : { display: 'none' }}>
              {popup}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RibbonGroup.defaultProps = {
  text: '',
  visible: true,
  enabled: true,
  active: false,
  events: {},
  palette: {},
}
