import { Stack } from '@fluentui/react'
import React from 'react'
import classnames from './index.module.css'

export default function NothingOpenScreen() {
  return (
    <div className={classnames.container}>
      <div>当前没有打开任何工作簿。</div>
    </div>
  )
}