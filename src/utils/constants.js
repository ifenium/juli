/**
 * Mathematical constants
 */
export const MATH_CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
  PHI: (1 + Math.sqrt(5)) / 2, // Golden ratio
}

/**
 * Button layout for the calculator
 * Organized in rows from top to bottom
 */
export const BUTTON_LAYOUT = [
  // Row 1: Mode toggle and hyperbolic functions
  [
    { label: 'DEG/RAD', type: 'mode', value: 'toggle-mode' },
    { label: 'sinh', type: 'function', value: 'sinh' },
    { label: 'cosh', type: 'function', value: 'cosh' },
    { label: 'tanh', type: 'function', value: 'tanh' },
    { label: 'C', type: 'special', value: 'clear' },
    { label: '⌫', type: 'special', value: 'backspace' },
  ],
  // Row 2: Advanced functions and constants
  [
    { label: 'n!', type: 'function', value: 'factorial' },
    { label: 'nCr', type: 'function', value: 'nCr' },
    { label: 'nPr', type: 'function', value: 'nPr' },
    { label: 'π', type: 'constant', value: 'π' },
    { label: 'e', type: 'constant', value: 'e' },
    { label: 'φ', type: 'constant', value: 'φ' },
  ],
  // Row 3: Trigonometric functions
  [
    { label: 'sin', type: 'function', value: 'sin' },
    { label: 'cos', type: 'function', value: 'cos' },
    { label: 'tan', type: 'function', value: 'tan' },
    { label: 'log', type: 'function', value: 'log' },
    { label: 'ln', type: 'function', value: 'ln' },
    { label: '√', type: 'function', value: '√' },
  ],
  // Row 4: Numbers and basic operators
  [
    { label: '7', type: 'number', value: '7' },
    { label: '8', type: 'number', value: '8' },
    { label: '9', type: 'number', value: '9' },
    { label: '÷', type: 'operator', value: '÷' },
    { label: '^', type: 'operator', value: '^' },
    { label: '(', type: 'special', value: '(' },
  ],
  // Row 5: More numbers
  [
    { label: '4', type: 'number', value: '4' },
    { label: '5', type: 'number', value: '5' },
    { label: '6', type: 'number', value: '6' },
    { label: '×', type: 'operator', value: '×' },
    { label: 'exp', type: 'function', value: 'exp' },
    { label: ')', type: 'special', value: ')' },
  ],
  // Row 6: More numbers and subtraction
  [
    { label: '1', type: 'number', value: '1' },
    { label: '2', type: 'number', value: '2' },
    { label: '3', type: 'number', value: '3' },
    { label: '-', type: 'operator', value: '-' },
    { label: 'Ans', type: 'special', value: 'ans' },
    { label: '.', type: 'special', value: '.' },
  ],
  // Row 7: Zero, equals, and addition
  [
    { label: '0', type: 'number', value: '0' },
    { label: '00', type: 'number', value: '00' },
    { label: '=', type: 'equals', value: 'equals' },
    { label: '+', type: 'operator', value: '+' },
    { label: '', type: 'empty', value: '' },
    { label: '', type: 'empty', value: '' },
  ],
]

/**
 * Button type definitions for styling
 */
export const BUTTON_TYPES = {
  number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '.'],
  operator: ['+', '-', '×', '÷', '^'],
  function: ['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'log', 'ln', '√', 'exp', 'factorial', 'nCr', 'nPr'],
  constant: ['π', 'e', 'φ'],
  special: ['C', '⌫', '(', ')', '.', 'ans'],
  mode: ['toggle-mode'],
  equals: ['equals'],
}

/**
 * Constants display mapping
 */
export const CONSTANT_VALUES = {
  π: 'π',
  e: 'e',
  φ: 'φ',
}

/**
 * Function name mapping for display
 */
export const FUNCTION_DISPLAY = {
  factorial: 'n!',
  nCr: 'nCr',
  nPr: 'nPr',
  sqrt: '√',
  'log10': 'log',
  'log': 'log',
  'ln': 'ln',
}
