import React, { createContext, useReducer, useCallback, useEffect } from 'react'
import { evaluate, formatNumber } from '../utils/calculator'
import { isEvaluable, canAddNumber, canAddOperator } from '../utils/validators'

export const CalculatorContext = createContext()

const initialState = {
  display: '0',
  expression: '',
  previousExpression: '', // Stores the expression that was calculated
  result: null,
  mode: 'deg', // 'deg' or 'rad'
  history: [],
  lastAnswer: null,
  error: null,
}

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'INPUT_DIGIT':
      return inputDigit(state, action.payload)

    case 'INPUT_OPERATOR':
      return inputOperator(state, action.payload)

    case 'INPUT_FUNCTION':
      return inputFunction(state, action.payload)

    case 'INPUT_CONSTANT':
      return inputConstant(state, action.payload)

    case 'CALCULATE':
      return calculate(state)

    case 'CLEAR':
      return {
        ...initialState,
        history: state.history,
        lastAnswer: state.lastAnswer,
      }

    case 'BACKSPACE':
      return backspace(state)

    case 'TOGGLE_MODE':
      return {
        ...state,
        mode: state.mode === 'deg' ? 'rad' : 'deg',
      }

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [action.payload, ...state.history].slice(0, 50),
        lastAnswer: action.payload.result,
      }

    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
      }

    case 'DELETE_HISTORY_ITEM':
      return {
        ...state,
        history: state.history.filter(item => item.id !== action.payload),
      }

    case 'LOAD_FROM_HISTORY':
      return {
        ...state,
        expression: action.payload.expression,
        display: action.payload.expression,
      }

    case 'INPUT_PARENTHESIS':
      return inputParenthesis(state, action.payload)

    case 'INPUT_DECIMAL':
      return inputDecimal(state)

    default:
      return state
  }
}

function inputDigit(state, digit) {
  // If display is '0' or we just finished a calculation, replace it
  if (state.display === '0' && digit !== '0') {
    return {
      ...state,
      display: digit,
      expression: state.expression ? state.expression + digit : digit,
    }
  }

  // Don't allow multiple leading zeros
  if (state.display === '0' && digit === '0') {
    return state
  }

  return {
    ...state,
    display: state.display + digit,
    expression: state.expression + digit,
  }
}

function inputOperator(state, operator) {
  if (!canAddOperator(state.expression)) {
    return state
  }

  // Replace operator if the last character is an operator
  if (/[+\-×÷^]$/.test(state.expression)) {
    const newExpr = state.expression.slice(0, -1) + operator
    return {
      ...state,
      expression: newExpr,
      display: operator,
    }
  }

  return {
    ...state,
    expression: state.expression + operator,
    display: operator,
  }
}

function inputFunction(state, func) {
  let newExpr = state.expression

  // Some functions need parentheses
  if (['factorial', 'nCr', 'nPr'].includes(func)) {
    return state // These are handled differently
  }

  // Map display names to function names
  const funcMap = {
    '√': 'sqrt',
    'ln': 'ln',
    'log': 'log',
    'sin': 'sin',
    'cos': 'cos',
    'tan': 'tan',
    'sinh': 'sinh',
    'cosh': 'cosh',
    'tanh': 'tanh',
    'exp': 'exp',
  }

  const funcName = funcMap[func] || func

  // Add opening parenthesis if it's not already there
  if (!newExpr.endsWith('(')) {
    newExpr += funcName + '('
  } else {
    newExpr += funcName + '('
  }

  return {
    ...state,
    expression: newExpr,
    display: func,
  }
}

function inputConstant(state, constant) {
  const newExpr = state.expression + constant
  return {
    ...state,
    expression: newExpr,
    display: constant,
  }
}

function inputParenthesis(state, paren) {
  const newExpr = state.expression + paren
  return {
    ...state,
    expression: newExpr,
    display: paren,
  }
}

function inputDecimal(state) {
  // Don't allow multiple decimals in the same number
  const parts = state.expression.split(/[+\-×÷^]/)
  const lastNumber = parts[parts.length - 1]

  if (lastNumber && lastNumber.includes('.')) {
    return state
  }

  // If display is empty or an operator, start with 0.
  if (state.display === '0' || /[+\-×÷^]$/.test(state.expression)) {
    return {
      ...state,
      expression: state.expression + '0.',
      display: '0.',
    }
  }

  return {
    ...state,
    expression: state.expression + '.',
    display: state.display + '.',
  }
}

function backspace(state) {
  if (state.expression.length === 0) {
    return state
  }

  const newExpr = state.expression.slice(0, -1)
  const newDisplay = newExpr || '0'

  return {
    ...state,
    expression: newExpr,
    display: newDisplay,
  }
}

function calculate(state) {
  if (!isEvaluable(state.expression)) {
    return state
  }

  try {
    const result = evaluate(state.expression, state.mode)

    if (result === 'Error') {
      return {
        ...state,
        display: 'Error',
        error: 'Invalid expression',
      }
    }

    const formattedResult = formatNumber(result)

    return {
      ...state,
      display: formattedResult,
      result,
      previousExpression: state.expression,
      expression: '',
      error: null,
    }
  } catch (err) {
    return {
      ...state,
      display: 'Error',
      error: err.message,
    }
  }
}

export function CalculatorProvider({ children }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState, (initial) => {
    // Load history from localStorage
    const saved = localStorage.getItem('calculator-history')
    if (saved) {
      try {
        const history = JSON.parse(saved)
        return { ...initial, history }
      } catch (e) {
        return initial
      }
    }
    return initial
  })

  // Sync history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calculator-history', JSON.stringify(state.history))
  }, [state.history])

  const inputDigit = useCallback((digit) => {
    dispatch({ type: 'INPUT_DIGIT', payload: digit })
  }, [])

  const inputOperator = useCallback((operator) => {
    dispatch({ type: 'INPUT_OPERATOR', payload: operator })
  }, [])

  const inputFunction = useCallback((func) => {
    dispatch({ type: 'INPUT_FUNCTION', payload: func })
  }, [])

  const inputConstant = useCallback((constant) => {
    dispatch({ type: 'INPUT_CONSTANT', payload: constant })
  }, [])

  const calculate = useCallback(() => {
    dispatch({ type: 'CALCULATE' })
  }, [])

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const backspace = useCallback(() => {
    dispatch({ type: 'BACKSPACE' })
  }, [])

  const toggleMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_MODE' })
  }, [])

  const addToHistory = useCallback((entry) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: entry })
  }, [])

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' })
  }, [])

  const deleteHistoryItem = useCallback((id) => {
    dispatch({ type: 'DELETE_HISTORY_ITEM', payload: id })
  }, [])

  const loadFromHistory = useCallback((entry) => {
    dispatch({ type: 'LOAD_FROM_HISTORY', payload: entry })
  }, [])

  const inputParenthesis = useCallback((paren) => {
    dispatch({ type: 'INPUT_PARENTHESIS', payload: paren })
  }, [])

  const inputDecimal = useCallback(() => {
    dispatch({ type: 'INPUT_DECIMAL' })
  }, [])

  const value = {
    state,
    inputDigit,
    inputOperator,
    inputFunction,
    inputConstant,
    calculate,
    clear,
    backspace,
    toggleMode,
    addToHistory,
    clearHistory,
    deleteHistoryItem,
    loadFromHistory,
    inputParenthesis,
    inputDecimal,
  }

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
}

export function useCalculatorContext() {
  const context = React.useContext(CalculatorContext)
  if (!context) {
    throw new Error('useCalculatorContext must be used within CalculatorProvider')
  }
  return context
}
