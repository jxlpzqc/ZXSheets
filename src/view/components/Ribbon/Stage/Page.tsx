import React from 'react'
import classnames from './Page.module.css'

type Props = {
  title?: string;
}

export default function Page({ title, children }: React.PropsWithChildren<Props>) {
  return (
    <div className={classnames.page}>
      <h1 className={classnames.header}>
        {title}
      </h1>
      <div className={classnames.content}>
        {children}
      </div>
    </div>
  )
}