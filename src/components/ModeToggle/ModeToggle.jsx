import React from 'react'
import styles from './ModeToggle.module.css'
import { useCalculatorContext } from '../../context/CalculatorContext'

export function ModeToggle() {
  const { state, toggleMode } = useCalculatorContext()

  return (
    <div className={styles.modeContainer}>
      <div className={styles.label}>Mode</div>
      <button
        className={styles.toggle}
        onClick={toggleMode}
        aria-label={`Switch to ${state.mode === 'deg' ? 'Radian' : 'Degree'} mode`}
        title={`Currently in ${state.mode === 'deg' ? 'Degree' : 'Radian'} mode`}
      >
        <span className={`${styles.option} ${state.mode === 'deg' ? styles.active : ''}`}>
          DEG
        </span>
        <span className={styles.divider}>/</span>
        <span className={`${styles.option} ${state.mode === 'rad' ? styles.active : ''}`}>
          RAD
        </span>
      </button>
    </div>
  )
}
