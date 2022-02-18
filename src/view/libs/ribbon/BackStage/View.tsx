import styles from './index.module.css'
import React, { Component } from 'react'
import { IBackStagePageProps } from './Page';
import PageLabels from './PageLabels';
import { RibbonPalette } from '../RibbonPalette';

interface IBackStageViewProps {

  /**
   * index of active page
   */
  currentPage: number,
  /**
   * when false - component invisible
   */
  visible: boolean,
  /**
   * when false - events inactive
   */
  enable: boolean,
  /**
   * font of Ribbon in format [font-style||font-variant||font-weight] font-size [/line-height] font-family | inherit
   */
  font: string,
  /**
   * object with color schema
   */
  palette: RibbonPalette,
  /**
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>
  onTabClick?: (e: number) => void;
}

export default class BackStageView extends Component<IBackStageViewProps> {
  static defaultProps: IBackStageViewProps;
  render() {
    const palette = this.props.palette
    const pages = React.Children.map(this.props.children,
      (child: any) => React.cloneElement(child, child.props.hasOwnProperty('palette') ? { palette } : undefined)
    ) as React.ReactElement<IBackStagePageProps>[];

    const isVisible = this.props.visible

    const activePage = this.props.currentPage
    const font = this.props.font
    const events = this.props.events


    const styleObj = {
      font,
      backgroundColor: palette.backStageButton || '#217346',
      color: palette.backStageText || '#ffffff',
    }

    if (!isVisible) {
      return null
    }
    return (
      <div className={styles.view} style={styleObj}>
        <div className={styles.arrow} {...events} />
        <PageLabels
          pages={pages}
          activePage={activePage}
          palette={palette}
          onClick={(e) => { this.props.onTabClick && this.props.onTabClick(e); }}
        />
        {pages[activePage]}
      </div>
    )
  }
}



BackStageView.defaultProps = {
  currentPage: 0,
  visible: true,
  enable: true,
  font: '',
  palette: {},
  events: {},
}
