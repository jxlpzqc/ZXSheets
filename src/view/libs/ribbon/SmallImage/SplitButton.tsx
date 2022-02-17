import styles from './index.module.css'
import React, { useState } from 'react'
// import { detectBlur } from '../helpers'
import PropTypes from 'prop-types'
import { RibbonPalette } from '../RibbonPalette'


export interface ISplitButtonWithSmallImageProps {
  /**
   * when false - component invisible
   */
  visible: boolean,
  /**
   * when false - events inactive
   */
  enabled: boolean,
  /**
   * url to image
   */
  image: string,
  /**
   * when true - dropdown list is open
   */
  active: boolean,
  color: string,
  /**
   * events of the button
   */
  buttonEvents: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * events of arrow near the button
   */
  arrowEvents: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette: RibbonPalette,

  onClick: () => void;
}

export default function SplitButtonWithSmallImage(props:React.PropsWithChildren<ISplitButtonWithSmallImageProps>) {
    const [isActive, setIsActive] = useState(false)

    const palette = props.palette
    const children = React.Children.map(props.children,
      (child:any) => React.cloneElement(child, child.props.hasOwnProperty('palette') ? {palette} : undefined)
    )

    let isEnable = props.enabled
    const backgroundImage = 'url(' + props.image + ')'

    let borderBottom = 'none'

    if (props.color !== '') {
      borderBottom = '4px solid ' + props.color
    }

    const marginTop = '17px'

    const buttonEvents = props.buttonEvents
    const arrowEvents = props.arrowEvents

    return (
      <div className={styles.splitBtn + ' ' + (isActive ? styles.active : '') + ' ' + (isEnable ? '' : styles.enable)}
      onBlur={() => {
        setIsActive(false)
      }}
      onClick={() => {
        if(props.onClick) {
          props.onClick()
        }
      }}>
        <div className={styles.image} style={{backgroundImage}} {...buttonEvents}>
          <div style={{borderBottom, marginTop}} ></div>
        </div>
        <div className={styles.arrow} tabIndex={-1} {...arrowEvents}
          onClick={(e) => {
            e.stopPropagation()
            setIsActive(true)
          }}>
        </div>
        {isActive && <div className={styles.list}
          onClick={(e) => {
            e.stopPropagation()
            setIsActive(false)
          }}>
          {children}
        </div>}
      </div>
    )
}


SplitButtonWithSmallImage.defaultProps = {
  visible: true,
  enabled: true,
  active: false,
  color: '',
  image: '',
  buttonEvents: {},
  arrowEvents: {},
  palette: {},
}
