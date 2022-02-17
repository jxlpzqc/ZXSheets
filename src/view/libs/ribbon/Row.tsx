import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RibbonPalette } from './RibbonPalette'

export interface IRibbonRowProps {

  /**
   * object with color schema
   */
  palette?: RibbonPalette,
}

export default class RibbonRow extends Component<IRibbonRowProps> {
  render() {
    const palette = this.props.palette
    const children = React.Children.map(this.props.children,
      (child:any) => React.cloneElement(child, child.props.hasOwnProperty(palette) ? { palette } : undefined)
    )

    return (
      <div className={styles.row}>
        {
          children && children.map((child, i) => { // render tabs labels
            return <div key={i} className={styles.rowItem}>
              {child}
            </div>
          })
        }
      </div>
    )
  }
}


