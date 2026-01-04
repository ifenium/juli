# Scientific Calculator Web App

A professional, responsive scientific calculator web application built with React and Vite, featuring the Financial Times design aesthetic.

## Features

### Scientific Functions
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Exponentiation**: Power function (^)
- **Trigonometric**: sin, cos, tan with degree/radian mode toggle
- **Inverse Trigonometric**: asin, acos, atan
- **Hyperbolic**: sinh, cosh, tanh, asinh, acosh, atanh
- **Logarithmic**: log (base 10), ln (natural log)
- **Other Functions**: Square root (√), factorial (n!), combinations (nCr), permutations (nPr), exponential (exp)

### Mathematical Constants
- **π** (Pi): 3.14159...
- **e** (Euler's number): 2.71828...
- **φ** (Golden ratio): 1.61803...

### Additional Features
- **Degree/Radian Mode**: Toggle between degree and radian modes for trigonometric calculations
- **Calculation History**: View and manage your calculation history with timestamps
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Keyboard Support**: Full keyboard support for quick calculations
- **Smooth Animations**: Professional transitions and ripple effects
- **LocalStorage**: History is automatically saved and persists between sessions

## Design

The application follows the Financial Times design guide with:
- **Color Palette**:
  - Salmon pink/cream background (#FFF1E5)
  - Dark text (#262A33)
  - Accent red (#FF7F7F)
  - Subtle borders and shadows
- **Typography**: Serif fonts for display (Georgia/Financier), sans-serif for controls
- **Layout**: Clean, minimalist interface with professional appearance

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: CSS Modules with CSS Custom Properties
- **Math Engine**: mathjs (for safe mathematical expression evaluation)
- **Storage**: LocalStorage for history persistence
- **State Management**: React Context API with custom hooks

## Project Structure

```
juli-1/
├── src/
│   ├── components/
│   │   ├── Button/              # Individual button component with ripple effects
│   │   ├── Calculator/          # Main calculator container
│   │   ├── Display/             # Calculator display area
│   │   ├── ModeToggle/          # Degree/Radian toggle
│   │   ├── ButtonGrid/          # Button layout grid
│   │   ├── History/             # History panel
│   │   └── Layout/              # Main app layout
│   ├── context/
│   │   └── CalculatorContext.jsx    # Global state management
│   ├── hooks/
│   │   └── useKeyboard.js           # Keyboard event handler
│   ├── utils/
│   │   ├── calculator.js            # Core calculation engine
│   │   ├── constants.js             # Button layouts and constants
│   │   ├── validators.js            # Input validation
│   │   └── formatters.js            # Output formatting
│   ├── styles/
│   │   ├── variables.css            # CSS custom properties and theming
│   │   ├── globals.css              # Global styles
│   │   └── animations.css           # Animation definitions
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── .npmrc
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install --cache=/tmp/npm-cache

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Usage

### Keyboard Shortcuts
- **Numbers**: 0-9, .
- **Basic Operators**: +, -, *, /
- **Power**: ^
- **Calculate**: Enter or =
- **Clear**: Escape or C
- **Backspace**: Backspace
- **Parentheses**: ( )

### Mouse/Touch
- Click buttons to input numbers and operators
- Press = to calculate
- Press C to clear
- Click history entries to reload them
- Toggle DEG/RAD to switch modes

### History
- Calculations are automatically saved to history
- Click a history entry to load it back into the calculator
- Delete individual entries with the × button
- Clear all history with the "Clear History" button
- History persists in localStorage

## Responsive Design

The calculator is fully responsive:
- **Mobile** (<640px): Stacked layout, optimized button sizes
- **Tablet** (641px-1024px): Calculator and history side-by-side or stacked
- **Desktop** (>1024px): Full layout with calculator on left, history on right

## Performance

- Lightweight bundle optimized for fast loading
- GPU-accelerated CSS animations
- Memoized React components to prevent unnecessary re-renders
- Efficient expression evaluation with mathjs
- History limited to 50 most recent entries to manage memory

## Accessibility

- **ARIA Labels**: All buttons have descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support for all functions
- **Focus Indicators**: Clear focus states for keyboard navigation
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Color Contrast**: Text meets WCAG AA standards

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Error Handling

The calculator safely handles:
- Invalid expressions (unbalanced parentheses, missing operands)
- Mathematical errors (division by zero, overflow)
- Invalid function calls
- All errors are displayed as "Error" in the display

## Future Enhancements

- RPN (Reverse Polish Notation) mode
- Unit conversion tools
- Graph visualization for functions
- More trigonometric functions (sec, csc, cot)
- Custom variables and functions
- Dark mode theme
- Export calculation results as CSV/PDF

## License

This project is open source and available for educational and personal use.

## Development

### Adding New Functions

To add a new mathematical function:

1. Add the function logic to `src/utils/calculator.js`
2. Add the button to `src/utils/constants.js` in `BUTTON_LAYOUT`
3. Handle the button click in `src/components/ButtonGrid/ButtonGrid.jsx`
4. Add CSS styling for the button type in button styles

### Modifying the Theme

Edit `src/styles/variables.css` to change:
- Colors (update --color-* variables)
- Typography (fonts and sizes)
- Spacing and sizes
- Shadows and border radius

### Testing Calculations

Test calculations with:
- Simple arithmetic: 2+2
- Trigonometry: sin(45) in DEG mode
- Complex expressions: (5+3)*2^3
- Functions: sqrt(16), factorial(5), log(100)
- Constants: π*2, e^2

## Support

For issues, feature requests, or contributions, please create an issue or pull request.
