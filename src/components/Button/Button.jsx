import React, { useRef, useEffect } from 'react'
import styles from './Button.module.css'

export function Button({
  label,
  value,
  type = 'number',
  onClick,
  disabled = false,
  ariaLabel,
}) {
  const buttonRef = useRef(null)

  // Create ripple effect on click
  const handleClick = (e) => {
    if (disabled) return

    // Add ripple animation
    const ripple = document.createElement('span')
    ripple.classList.add(styles.ripple)

    const rect = buttonRef.current.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'

    buttonRef.current.appendChild(ripple)

    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600)

    // Call the onClick handler
    if (onClick) {
      onClick(value)
    }
  }

  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${styles[type]} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      title={label}
      type="button"
    >
      <span className={styles.label}>{label}</span>
    </button>
  )
}
