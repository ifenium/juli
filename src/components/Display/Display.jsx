import React from 'react'
import styles from './Display.module.css'
import { useCalculatorContext } from '../../context/CalculatorContext'
import { formatNumber } from '../../utils/calculator'

export function Display() {
  const { state } = useCalculatorContext()

  return (
    <div className={styles.displayContainer}>
      <div className={styles.display}>
        <div className={styles.expression}>
          {state.expression || '0'}
        </div>
        <div className={styles.result}>
          {state.display}
        </div>
      </div>
    </div>
  )
}
