import styles from './index.module.css'
import React, { useState } from 'react'
import { RibbonPalette } from './RibbonPalette'

export interface IComboBoxProps {
  index?: number;
  /**
   * text in combo box
   */
  text: string | number,
  /**
   * text near combo box
   */
  label: string,
  /**
   * when false - component invisible
   */
  visible: boolean,
  /**
   * when false - events inactive
   */
  enabled: boolean,
  /**
   * when true - dropdown list is open
   */
  active: boolean,
  /**
   * array of data shown in dropdown
   */
  data: (string | number)[],
  /**
   * width of component
   */
  width: number,
  /**
   * events of component
   */
  events: React.AllHTMLAttributes<HTMLDivElement>,
  /**
   * object with color schema
   */
  palette: RibbonPalette,
  onSelectionIndexChanged?: (index: number, item: string | number) => void;
}

export default function ComboBox(props: IComboBoxProps) {
  // shouldComponentUpdate (nextProps) {
  //   let prevString = JSON.stringify(this.props)
  //   let nextString = JSON.stringify(nextProps)
  //   return prevString !== nextString
  // }
  const [isActive, setIsActive] = useState(false)

  const isVisible = props.visible
  const isEnable = props.enabled
  const text = props.text
  const label = props.label
  const data = props.data
  const index = props.index ?? -1;
  const width = props.width + 'px'

  const events = isEnable ? props.events : {}

  if (!isVisible) {
    return null
  }

  let text2 = text
  if (index > -1 && data) {
    text2 = data[index]
  }
  return (
    <div className={styles.comboBox} onBlur={() => {
      setIsActive(false)
    }}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.dropDown + ' ' + (isActive ? styles.active : '')}
        style={{ width }}
        tabIndex={-1}
        onClick={() => {
          setIsActive(true)
        }}
        {...events}>
        <div className={styles.text}>
          {text2}
        </div>
        {isActive && <div className={styles.list} onClick={(e) => {
          e.stopPropagation()
          setIsActive(false)
        }}>
          {data.map((item, key) => {
            return <div className={styles.item} key={key} onClick={
              () => { if (props.onSelectionIndexChanged) props.onSelectionIndexChanged(key, item) }
            }>
              {item}
            </div>
          })}
        </div>}
      </div>
    </div>
  )
}

ComboBox.defaultProps = {
  text: '',
  label: '',
  visible: true,
  enabled: true,
  active: false,
  width: 45,
  data: [],
  events: {},
  palette: {},
}
