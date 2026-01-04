import React from 'react'
import styles from './AppLayout.module.css'
import { Calculator } from '../Calculator/Calculator'
import { History } from '../History/History'

export function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <div className={styles.container}>
        <div className={styles.main}>
          <header className={styles.header}>
            <h1 className={styles.title}>Scientific Calculator</h1>
          </header>
          <Calculator />
        </div>
        <aside className={styles.sidebar}>
          <History />
        </aside>
      </div>
    </div>
  )
}
