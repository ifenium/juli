import { useEffect } from 'react'
import { useCalculatorContext } from '../context/CalculatorContext'

/**
 * Hook to handle keyboard input for the calculator
 */
export function useKeyboard() {
  const {
    inputDigit,
    inputOperator,
    inputFunction,
    inputConstant,
    calculate,
    backspace,
    clear,
    toggleMode,
    inputParenthesis,
    inputDecimal,
  } = useCalculatorContext()

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default behavior for calculator keys
      const key = e.key

      // Number keys
      if (/^[0-9]$/.test(key)) {
        e.preventDefault()
        inputDigit(key)
        return
      }

      // Decimal point
      if (key === '.') {
        e.preventDefault()
        inputDecimal()
        return
      }

      // Basic operators
      if (key === '+') {
        e.preventDefault()
        inputOperator('+')
        return
      }

      if (key === '-') {
        e.preventDefault()
        inputOperator('-')
        return
      }

      if (key === '*') {
        e.preventDefault()
        inputOperator('×')
        return
      }

      if (key === '/') {
        e.preventDefault()
        inputOperator('÷')
        return
      }

      // Power operator
      if (key === '^') {
        e.preventDefault()
        inputOperator('^')
        return
      }

      // Parentheses
      if (key === '(') {
        e.preventDefault()
        inputParenthesis('(')
        return
      }

      if (key === ')') {
        e.preventDefault()
        inputParenthesis(')')
        return
      }

      // Enter or = to calculate
      if (key === 'Enter' || key === '=') {
        e.preventDefault()
        calculate()
        return
      }

      // Backspace to delete last character
      if (key === 'Backspace') {
        e.preventDefault()
        backspace()
        return
      }

      // Escape to clear
      if (key === 'Escape') {
        e.preventDefault()
        clear()
        return
      }

      // c or C to clear
      if (key.toLowerCase() === 'c') {
        e.preventDefault()
        clear()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    inputDigit,
    inputOperator,
    inputFunction,
    inputConstant,
    calculate,
    backspace,
    clear,
    toggleMode,
    inputParenthesis,
    inputDecimal,
  ])
}
