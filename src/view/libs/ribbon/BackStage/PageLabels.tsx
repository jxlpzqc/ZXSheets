import styles from './index.module.css'
import React, { Component } from 'react'
import Page, { IBackStagePageProps } from './Page';
import { RibbonPalette } from '../RibbonPalette';

export interface IPageLabelsProps {

  pages?: React.ReactElement<IBackStagePageProps>[],
  activePage: number,
  palette: RibbonPalette,
  events: React.AllHTMLAttributes<HTMLDivElement>,
  onClick(index: number): void;
}

export default class PageLabels extends Component<IPageLabelsProps> {
  static defaultProps: Partial<IPageLabelsProps>;
  render() {
    return (
      <div className={styles.labels}>
        {
          this.props.pages?.map((tab, i) => { // render tabs labels
            const pageText = tab.props.text
            const palette = tab.props.palette
            const pageVisible = tab.props.visible
            const isEnable = tab.props.enable

            const styleObj = this.props.activePage === i ? {
              backgroundColor: palette?.activeBackStageButton || '#439467',
              color: palette?.backStageText || '#ffffff',
            } : {
              backgroundColor: palette?.backStageButton || '#217346',
              color: palette?.backStageText || '#ffffff',
            }

            const events = isEnable ? tab.props.events : {}

            if (!pageVisible) {
              return null
            }
            return <div
              key={i}
              className={styles.pageLabel}
              onClick={() => { this.props.onClick(i) }}
              {...events}
              style={styleObj}>
              <div className={styles.inner}>
                {pageText}
              </div>
            </div>
          })
        }
      </div>
    )
  }
}


PageLabels.defaultProps = {
  pages: [],
  activePage: 0,
  palette: {},
  events: {}
}
