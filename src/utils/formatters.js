/**
 * Formats a number for display
 * Limits decimal places and uses scientific notation for very large/small numbers
 */
export function formatNumber(value, maxDecimals = 10) {
  if (value === 'Error') return 'Error'
  if (typeof value !== 'number') return String(value)
  if (!isFinite(value)) return 'Error'

  // Handle very large or very small numbers with scientific notation
  if (Math.abs(value) > 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6)
  }

  // Convert to string
  const str = value.toString()

  // Handle decimal numbers
  if (str.includes('.')) {
    const [intPart, decPart] = str.split('.')

    // Limit decimal places
    if (decPart.length > maxDecimals) {
      const rounded = parseFloat(value.toFixed(maxDecimals))
      return rounded.toString().replace(/\.?0+$/, '')
    }

    // Remove trailing zeros
    return value.toString().replace(/\.?0+$/, '')
  }

  return str
}

/**
 * Formats the display string for the calculator
 * Shows expression with proper spacing
 */
export function formatExpression(expr) {
  if (!expr) return ''

  // Add spaces around operators for readability
  let formatted = expr
    .replace(/([+\-×÷^])/g, ' $1 ')
    .replace(/\s+/g, ' ')
    .trim()

  return formatted
}

/**
 * Truncates a string if it exceeds max length
 * Used for display limiting
 */
export function truncateDisplay(str, maxLength = 30) {
  if (str.length <= maxLength) return str

  // Try to truncate intelligently
  const truncated = str.substring(0, maxLength - 3)
  return truncated + '...'
}

/**
 * Formats a number with thousand separators
 */
export function formatWithSeparators(value) {
  if (typeof value !== 'number') return String(value)

  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return parts.join('.')
}

/**
 * Converts number to string with proper formatting
 */
export function numberToString(num) {
  if (num === null || num === undefined) return ''
  if (typeof num === 'string') return num

  // Handle very large numbers
  if (Math.abs(num) > 1e15) {
    return num.toExponential(6)
  }

  // Remove trailing zeros after decimal point
  return num.toString().replace(/\.?0+$/, '')
}

/**
 * Formats an error message
 */
export function formatError(error) {
  if (error === 'Error' || error === null || error === undefined) {
    return 'Error'
  }
  return String(error).substring(0, 30)
}

/**
 * Formats the history entry display
 */
export function formatHistoryEntry(expression, result) {
  const formattedExpr = formatExpression(expression)
  const formattedResult = formatNumber(result)
  return `${formattedExpr} = ${formattedResult}`
}

/**
 * Formats a timestamp for display
 */
export function formatTimestamp(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  const now = new Date()
  const diff = now - date

  // Within last minute
  if (diff < 60000) {
    return 'Just now'
  }

  // Within last hour
  if (diff < 3600000) {
    const mins = Math.floor(diff / 60000)
    return `${mins}m ago`
  }

  // Within last day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}h ago`
  }

  // Show date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
