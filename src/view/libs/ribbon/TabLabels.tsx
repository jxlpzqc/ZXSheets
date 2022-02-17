import React, { useState } from "react"
import { Component } from "react"
import { RibbonPalette } from "./RibbonPalette"
import RibbonTabPage, { IRibbonTabPageProps } from "./RibbonTabPage"
import styles from './index.module.css'
import { ids } from "webpack"

type RequiredDivAttribute = Required<React.AllHTMLAttributes<HTMLDivElement>>;

export type DivEvents = Partial<
  Pick<RequiredDivAttribute,
    Exclude<{
      [K in keyof RequiredDivAttribute]: RequiredDivAttribute[K] extends React.EventHandler<any>
      ? K
      : never
    }[keyof RequiredDivAttribute], undefined>
  >
>;

type TabEventHandler = (index: number, ...args: any[]) => void;

export type TabEvents = {
  [K in keyof DivEvents]: TabEventHandler;
}


interface ITabLabelsProps {
  tabs?: React.ReactElement<IRibbonTabPageProps>[],
  activeTab: number,
  palette: RibbonPalette,
  events: TabEvents,
}

// tab labels component
export default function TabLabels(props: ITabLabelsProps) {

  const [hover, setHover] = useState(-1);

  const tabs = props.tabs && props.tabs.map((tab, i) => {
    // render tabs labels
    const tabText = tab.props.text
    const palette = tab.props.palette
    const tabVisible = tab.props.visible
    const isEnable = tab.props.enabled

    const styleObj = props.activeTab === i ? {
      backgroundColor: palette?.tabBody || '#f1f1f1',
      color: palette?.main,
    } : {
      backgroundColor: palette?.main,
      color: palette?.inActiveTab || '#ffffff',
    }

    if (hover == i && props.activeTab !== i && palette?.tabHover) styleObj.backgroundColor = palette?.tabHover;

    const tabEvents = isEnable ? props.events : undefined
    const events: DivEvents | {} = {};

    if (!!tabEvents) {
      for (const key in tabEvents) {
        if (tabEvents.hasOwnProperty(key)) {
          // @ts-ignore
          const eventTmp: TabEventHandler = tabEvents[key];

          // @ts-ignore
          events[key] = (e: any) => {
            eventTmp(i, e);
          }
        }
      }
    }


    if (!tabVisible) {
      return null
    }
    return (
      <div
        key={i}
        className={props.activeTab === i ? styles.activeTabLable : styles.tabLable}
        onMouseEnter={() => { setHover(i) }}
        onMouseLeave={() => { setHover(-1) }}
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


TabLabels.defaultProps = {
  tabs: [],
  activeTab: 0,
  palette: {},
  events: {},
}
