import { Stack } from '@fluentui/react'
import React from 'react'

export default function NothingOpenScreen() {
  return (
    <Stack>
      <Stack.Item grow><div></div></Stack.Item>
      <div>当前没有打开任何工作簿。</div>
      <Stack.Item grow><div></div></Stack.Item>
    </Stack>
  )
}