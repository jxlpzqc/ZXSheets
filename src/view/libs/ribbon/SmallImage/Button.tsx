import styles from './index.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RibbonPalette } from '../RibbonPalette'

export interface IButtonWithSmallImageProps {
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
  active: boolean,
  /**
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette: RibbonPalette,
}

export default function ButtonWithSmallImage(props:React.PropsWithChildren<IButtonWithSmallImageProps>) {
    const isEnable = props.enabled
    const isActive = props.active
    const backgroundImage = 'url(' + props.image + ')'

    let events = props.events

    return (
      <div className={styles.button + ' ' + (isActive ? styles.active : '') + ' ' + (isEnable ? '' : styles.enable)}
        {...events} >
        <div className={styles.image} style={{backgroundImage}}>
        </div>
      </div>
    )
}

ButtonWithSmallImage.propTypes = {

}

ButtonWithSmallImage.defaultProps = {
  visible: true,
  enabled: true,
  active: false,
  image: '',
  events: {},
  palette: {},
}
