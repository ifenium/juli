import * as math from 'mathjs'

/**
 * Converts degrees to radians
 */
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180)
}

/**
 * Converts radians to degrees
 */
function radiansToDegrees(radians) {
  return radians * (180 / Math.PI)
}

/**
 * Factorial function
 */
function factorial(n) {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

/**
 * Combinations: nCr = n! / (r! * (n-r)!)
 */
function combinations(n, r) {
  if (r > n) return 0
  if (r === 0 || r === n) return 1
  return factorial(n) / (factorial(r) * factorial(n - r))
}

/**
 * Permutations: nPr = n! / (n-r)!
 */
function permutations(n, r) {
  if (r > n) return 0
  return factorial(n) / factorial(n - r)
}

/**
 * Processes the expression for degree/radian conversion
 */
function processExpression(expr, mode) {
  let processed = expr

  // Replace constants
  processed = processed.replace(/π/g, Math.PI.toString())
  processed = processed.replace(/e(?![a-zA-Z0-9])/g, Math.E.toString())
  processed = processed.replace(/φ/g, ((1 + Math.sqrt(5)) / 2).toString())

  // If in degree mode, convert trig functions
  if (mode === 'deg') {
    // Convert sin, cos, tan to work with degrees
    processed = processed.replace(/sin\(/g, '__sin(')
    processed = processed.replace(/cos\(/g, '__cos(')
    processed = processed.replace(/tan\(/g, '__tan(')
  }

  return processed
}

/**
 * Validates the expression before evaluation
 */
function isValidExpression(expr) {
  if (!expr || expr.trim() === '') return false

  // Check for balanced parentheses
  let parenCount = 0
  for (const char of expr) {
    if (char === '(') parenCount++
    if (char === ')') parenCount--
    if (parenCount < 0) return false
  }
  if (parenCount !== 0) return false

  // Check for invalid characters
  const validChars = /^[0-9+\-*/.()πeφ\s√!×÷^nCrPsinhcoshtanh^logexp,]+$/i
  if (!validChars.test(expr)) return false

  return true
}

/**
 * Main evaluation function
 */
export function evaluate(expression, mode = 'deg') {
  try {
    if (!isValidExpression(expression)) {
      return 'Error'
    }

    // Create a math scope with custom functions
    const scope = {
      factorial,
      nCr: combinations,
      nPr: permutations,
      __sin: (x) => {
        const radians = mode === 'deg' ? degreesToRadians(x) : x
        return Math.sin(radians)
      },
      __cos: (x) => {
        const radians = mode === 'deg' ? degreesToRadians(x) : x
        return Math.cos(radians)
      },
      __tan: (x) => {
        const radians = mode === 'deg' ? degreesToRadians(x) : x
        return Math.tan(radians)
      },
      sinh: Math.sinh,
      cosh: Math.cosh,
      tanh: Math.tanh,
      asinh: Math.asinh,
      acosh: Math.acosh,
      atanh: Math.atanh,
      asin: (x) => {
        const result = Math.asin(x)
        return mode === 'deg' ? radiansToDegrees(result) : result
      },
      acos: (x) => {
        const result = Math.acos(x)
        return mode === 'deg' ? radiansToDegrees(result) : result
      },
      atan: (x) => {
        const result = Math.atan(x)
        return mode === 'deg' ? radiansToDegrees(result) : result
      },
    }

    // Process the expression
    let processed = processExpression(expression, mode)

    // Replace mathematical operators
    processed = processed.replace(/÷/g, '/')
    processed = processed.replace(/×/g, '*')
    processed = processed.replace(/\^/g, '**')
    processed = processed.replace(/√/g, 'sqrt')

    // Replace shorthand notations
    processed = processed.replace(/(\d)\s*\(/g, '$1*(')  // 2( -> 2*(
    processed = processed.replace(/\)\s*(\d)/g, ')*$1')  // )2 -> )*2
    processed = processed.replace(/\)\s*\(/g, ')*(')     // )( -> )*(
    processed = processed.replace(/(\d)\s*([a-zA-Z])/g, '$1*$2') // 2x -> 2*x

    // Evaluate using mathjs
    const result = math.evaluate(processed, scope)

    // Check for errors
    if (!isFinite(result)) {
      return 'Error'
    }

    // Round to avoid floating point errors
    const rounded = Math.round(result * 1e10) / 1e10

    return rounded
  } catch (error) {
    return 'Error'
  }
}

/**
 * Formats a number for display
 */
export function formatNumber(value) {
  if (value === 'Error') return 'Error'
  if (typeof value !== 'number') return String(value)

  // Handle very large or very small numbers with scientific notation
  if (Math.abs(value) > 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6)
  }

  // Handle normal numbers
  const str = value.toString()

  // Limit decimal places
  if (str.includes('.')) {
    const parts = str.split('.')
    if (parts[1].length > 10) {
      return value.toFixed(10).replace(/\.?0+$/, '')
    }
  }

  return str
}

/**
 * Checks if a string is a number
 */
export function isNumber(str) {
  return /^\d+$/.test(str)
}

/**
 * Checks if a string is an operator
 */
export function isOperator(str) {
  return ['+', '-', '×', '÷', '^', '*', '/'].includes(str)
}

/**
 * Checks if a string is a function
 */
export function isFunction(str) {
  return ['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'log', 'ln', '√', 'exp'].includes(str)
}
