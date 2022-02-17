import styles from './index.module.css'
import React, { Component } from 'react'
import { RibbonPalette } from './RibbonPalette'

export interface IColumnProps {

  // object with color schema
  palette: RibbonPalette

}


export default class Column extends Component<IColumnProps> {

  static defaultProps: IColumnProps;
  render() {
    const palette = this.props.palette
    const children = React.Children.map(this.props.children,
      (child: any) => React.cloneElement(child, child.props.hasOwnProperty('palette') ? { palette } : undefined)
    )

    return (
      <div className={styles.column}>
        {
          children?.map((child, i) => { // render tabs labels
            return <div key={i} className={styles.colItem}>
              {child}
            </div>
          })
        }
      </div>
    )
  }
}


Column.defaultProps = {
  palette: {},
}
