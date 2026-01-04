import React, { useEffect } from 'react'
import styles from './Calculator.module.css'
import { Display } from '../Display/Display'
import { ModeToggle } from '../ModeToggle/ModeToggle'
import { ButtonGrid } from '../ButtonGrid/ButtonGrid'
import { useKeyboard } from '../../hooks/useKeyboard'
import { useCalculatorContext } from '../../context/CalculatorContext'

export function Calculator() {
  const { state, addToHistory } = useCalculatorContext()

  // Enable keyboard support
  useKeyboard()

  // Add result to history when calculation is complete
  const lastResultRef = React.useRef(null)

  useEffect(() => {
    if (state.result !== null && state.expression === '' && lastResultRef.current !== state.result) {
      lastResultRef.current = state.result

      const historyEntry = {
        id: Date.now(),
        expression: state.previousExpression || 'Calculation',
        result: state.result,
        mode: state.mode,
        timestamp: new Date().toISOString(),
      }
      addToHistory(historyEntry)
    }
  }, [state.result, state.expression, state.previousExpression, state.mode, addToHistory])

  return (
    <div className={styles.calculator}>
      <Display />
      <ModeToggle />
      <ButtonGrid />
    </div>
  )
}
