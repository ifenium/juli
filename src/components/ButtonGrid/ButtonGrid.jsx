import React, { useCallback } from 'react'
import styles from './ButtonGrid.module.css'
import { Button } from '../Button/Button'
import { useCalculatorContext } from '../../context/CalculatorContext'
import { BUTTON_LAYOUT } from '../../utils/constants'

export function ButtonGrid() {
  const {
    inputDigit,
    inputOperator,
    inputFunction,
    inputConstant,
    calculate,
    clear,
    backspace,
    inputParenthesis,
    inputDecimal,
  } = useCalculatorContext()

  const handleButtonClick = useCallback((value, type) => {
    if (type === 'number') {
      inputDigit(value)
    } else if (type === 'operator') {
      inputOperator(value)
    } else if (type === 'function') {
      // Handle special function cases
      if (value === 'factorial') {
        inputFunction('n!')
      } else if (value === 'nCr' || value === 'nPr') {
        inputFunction(value)
      } else {
        inputFunction(value)
      }
    } else if (type === 'constant') {
      inputConstant(value)
    } else if (type === 'special') {
      switch (value) {
        case 'clear':
          clear()
          break
        case 'backspace':
          backspace()
          break
        case '(':
        case ')':
          inputParenthesis(value)
          break
        case '.':
          inputDecimal()
          break
        case 'ans':
          // This would load last answer - not implemented yet
          break
        default:
          break
      }
    } else if (type === 'equals') {
      calculate()
    }
  }, [inputDigit, inputOperator, inputFunction, inputConstant, calculate, clear, backspace, inputParenthesis, inputDecimal])

  return (
    <div className={styles.buttonGrid}>
      {BUTTON_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((buttonConfig, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={styles.buttonCell}>
              {buttonConfig.type !== 'empty' ? (
                <Button
                  label={buttonConfig.label}
                  value={buttonConfig.value}
                  type={buttonConfig.type}
                  onClick={() => handleButtonClick(buttonConfig.value, buttonConfig.type)}
                  ariaLabel={buttonConfig.label}
                />
              ) : (
                <div className={styles.emptyCell} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
