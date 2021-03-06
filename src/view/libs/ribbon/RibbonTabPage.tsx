import styles from './index.module.css'
import React, { Component } from 'react'
import { RibbonPalette } from './RibbonPalette'

export interface IRibbonTabPageProps {
  /**
   * text in tab label
   */
  text?: string,
  /**
   * when false - events inactive
   */
  enabled?: boolean,
  /**
   * when false - component invisible
   */
  visible?: boolean,
  /**
   * events of component
   */
  events?: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette?: RibbonPalette,


}

export default class RibbonTabPage extends Component<IRibbonTabPageProps> {

  static defaultProps: IRibbonTabPageProps;

  render() {
    // transmit palette to children
    const palette = this.props.palette
    const children = React.Children.map(this.props.children,
      (child: any) => React.cloneElement(child, child.props.hasOwnProperty('palette') ? { palette } : undefined)
    )

    const isEnable = this.props.enabled
    const isVisible = this.props.visible

    const styleObj = {
      backgroundColor: palette?.tabBody || '#F1F1F1',
    }

    // events if component disabled
    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.tab} style={styleObj} {...events}>
        {children}
      </div>
    )
  }
}


RibbonTabPage.defaultProps = {
  text: '',
  enabled: true,
  visible: true,
  events: {},
  palette: {},
}
