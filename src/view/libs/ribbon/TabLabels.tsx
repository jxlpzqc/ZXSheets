import React from "react"
import { Component } from "react"
import { RibbonPalette } from "./RibbonPalette"
import RibbonTabPage, { IRibbonTabPageProps } from "./RibbonTabPage"
import styles from './index.module.css'

interface ITabLabelsProps {
  tabs?: React.ReactElement<IRibbonTabPageProps>[],
  activeTab: number,
  palette: RibbonPalette,
  events: React.AllHTMLAttributes<HTMLDivElement>,
}

// tab labels component
export default class TabLabels extends Component<ITabLabelsProps> {

  static defaultProps: ITabLabelsProps;

  render() {
    let tabs = this.props.tabs && this.props.tabs.map((tab, i) => {
      // render tabs labels
      const tabText = tab.props.text
      const palette = tab.props.palette
      const tabVisible = tab.props.visible
      const isEnable = tab.props.enable

      const styleObj = this.props.activeTab === i ? {
        backgroundColor: palette.tabBody || '#f1f1f1',
        color: palette.main,
      } : {
        backgroundColor: palette.main,
        color: palette.inActiveTab || '#ffffff',
      }

      const tabEvents = isEnable ? this.props.events : {}
      const events: any = {}

      // filter
      for (const key in tabEvents) {
        if (tabEvents.hasOwnProperty(key)) {
          // @ts-ignore
          const eventTmp = tabEvents[key]

          events[key] = () => {
            eventTmp(i)
          }
        }
      }

      if (!tabVisible) {
        return null
      }
      return (
        <div
          key={i}
          className={this.props.activeTab === i ? styles.activeTabLable : styles.tabLable}
          {...events}
          style={styleObj} >
          <div className={styles.inner}>
            {tabText}
          </div>
        </div>);

    })

    return (
      <div style={{ display: 'inline' }}>
        {tabs}
      </div>
    )
  }
}


TabLabels.defaultProps = {
  tabs: [],
  activeTab: 0,
  palette: {},
  events: {},
}
