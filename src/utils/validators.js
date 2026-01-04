/**
 * Validates if a string is a valid number input
 */
export function isValidNumber(str) {
  return /^[0-9.]$/.test(str)
}

/**
 * Validates if a string is a valid operator
 */
export function isValidOperator(str) {
  return ['+', '-', '×', '÷', '^', '*', '/'].includes(str)
}

/**
 * Validates if a string ends with an operator
 */
export function endsWithOperator(expr) {
  return /[+\-×÷^*/]$/.test(expr)
}

/**
 * Validates if a string ends with a function name
 */
export function endsWithFunction(expr) {
  const functions = ['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'log', 'ln', 'sqrt', 'exp']
  return functions.some(fn => expr.toLowerCase().endsWith(fn))
}

/**
 * Validates if parentheses are balanced
 */
export function hasBalancedParentheses(expr) {
  let count = 0
  for (const char of expr) {
    if (char === '(') count++
    if (char === ')') count--
    if (count < 0) return false
  }
  return count === 0
}

/**
 * Validates if expression can be evaluated
 */
export function isValidExpression(expr) {
  if (!expr || expr.trim() === '') return false
  if (!hasBalancedParentheses(expr)) return false
  if (endsWithOperator(expr)) return false
  return true
}

/**
 * Checks if the expression should allow another operator
 */
export function canAddOperator(expr) {
  if (!expr || expr.length === 0) return false
  const lastChar = expr[expr.length - 1]
  return /[0-9)πeφ]/.test(lastChar)
}

/**
 * Checks if the expression should allow another number
 */
export function canAddNumber(expr) {
  // Can always add a number at the start or after operators, functions, or opening parenthesis
  if (!expr || expr.length === 0) return true
  const lastChar = expr[expr.length - 1]
  return /[+\-×÷(,^*\/]/.test(lastChar) || endsWithFunction(expr)
}

/**
 * Validates a complete expression for evaluation
 */
export function isEvaluable(expr) {
  if (!expr || expr.trim() === '') return false
  if (!hasBalancedParentheses(expr)) return false
  if (endsWithOperator(expr)) return false
  // Expression must end with a number or constant or closing parenthesis
  return /[0-9)πeφ]$/.test(expr)
}

/**
 * Checks if a string is a valid function name
 */
export function isValidFunction(str) {
  const functions = ['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'log', 'ln', 'sqrt', 'exp', 'factorial', 'nCr', 'nPr']
  return functions.includes(str.toLowerCase())
}

/**
 * Checks if a string is a mathematical constant
 */
export function isConstant(str) {
  return ['π', 'e', 'φ'].includes(str)
}
