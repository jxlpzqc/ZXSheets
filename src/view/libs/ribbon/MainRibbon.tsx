import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabLabels from './TabLabels'
import RibbonTabPage from './RibbonTabPage'
import { RibbonPalette } from './RibbonPalette'


export interface IMainRibbonProps {
  /**
   * title
   */
  text?: string,
  /**
   * index of active tab
   */
  currentTab?: number,
  /**
   * font of Ribbon
   * format: [font-style||font-variant||font-weight] font-size [/line-height] font-family | inherit
   */
  font?: string,
  /**
   * when false - events inactive
   */
  enabled?: boolean,
  /**
   * object with color schema
   */
  palette?: RibbonPalette,
  /**
   * events of file button
   */
  fileButtonText?: string,
  /**
   * events of tab label (first argument is index of tab)
   */
  fileButtonEvents?: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * Events for tab (first argument is index of tab)
   */
  tabEvents?: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * array of elements which will be set in quick access button line
   */
  quickAccessButtons?: React.ReactElement | React.ReactElement[],

}

export default class MainRibbon extends Component<IMainRibbonProps> {

  static defaultProps: IMainRibbonProps;

  render() {
    const palette = this.props.palette
    let tabs = React.Children.map(this.props.children,
      (child:any, k) => child && React.cloneElement(child, { key: k, palette })
    )

    const font = this.props.font
    const activeTab = this.props.currentTab ?? 0;

    const quickAccessButtons = this.props.quickAccessButtons ? ((Array.isArray(this.props.quickAccessButtons)
      ? this.props.quickAccessButtons
      : [this.props.quickAccessButtons])
      .map(
        (child, k) => React.cloneElement(child, { key: k }))) : null
    const text = this.props.text

    const fileButtonEvents = this.props.fileButtonEvents
    const tabEvents = this.props.tabEvents

    // if component have only one child wrap it in array
    if (tabs && !Array.isArray(tabs)) {
      tabs = [tabs]
    }

    const styleObj = {
      font,
      backgroundColor: palette?.main || "#2a569a",
      cursor: 'default',
      height: '100%',
    }

    return (
      <div className={styles.main} style={styleObj} >
        <span className={styles.ribbonTitle}> {text} </span>
        <div className={styles.quickAccessBtn} >
          {quickAccessButtons}
        </div>
        <div className={styles.backstageViewButton}
          {...fileButtonEvents} >
          <div className={styles.inner}
            style={{
              backgroundColor: palette?.main,
              color: palette?.inActiveTab || '#ffffff',
            }
            }>
            {this.props.fileButtonText || '文件'}
          </div>
        </div>
        <TabLabels
          tabs={tabs}
          activeTab={activeTab}
          events={tabEvents}
          palette={palette} />
        <div>
          {/* render selected tab content*/}
          {tabs && tabs[activeTab]}
        </div>
      </div>
    )
  }
}



MainRibbon.defaultProps = {
  text: '',
  currentTab: 0,
  font: '',
  enabled: true,
  palette: {},
  fileButtonEvents: {},
  tabEvents: {},
  fileButtonText: '文件'
}
