import styles from './index.module.css'
import React, { Component } from 'react'
import { RibbonPalette } from '../RibbonPalette'


export interface IBackStagePageProps {

  /**
   * text in page label
   */
  text: string,
  /**
   * when false - events inactive
   */
  enable: boolean,
  /**
   * when false - component invisible
   */
  visible: boolean,
  /**
   * events of component
   */
  events?: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette?: RibbonPalette,

}

export default class BackStagePage extends Component<IBackStagePageProps> {
  static defaultProps: IBackStagePageProps;
  render() {
    const palette = this.props.palette

    const isEnable = this.props.enable
    const isVisible = this.props.visible

    const styleObj: React.CSSProperties = {
      backgroundColor: '#FFFFFF',
      color: '#444444',
    }

    const events = isEnable ? this.props.events : {}

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.page} style={styleObj} {...events}>
        {this.props.children}
      </div>
    )
  }
}

BackStagePage.defaultProps = {
  text: '',
  enable: true,
  visible: true,
  events: {},
  palette: {},
}
