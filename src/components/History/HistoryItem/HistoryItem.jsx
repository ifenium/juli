import React, { useState } from 'react'
import styles from './HistoryItem.module.css'
import { formatHistoryEntry, formatTimestamp } from '../../../utils/formatters'
import { useCalculatorContext } from '../../../context/CalculatorContext'

export function HistoryItem({ entry, onDelete }) {
  const { loadFromHistory } = useCalculatorContext()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = () => {
    loadFromHistory(entry)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(entry.id)
    }, 150)
  }

  return (
    <div
      className={`${styles.historyItem} ${isDeleting ? styles.deleting : ''}`}
      onClick={handleClick}
    >
      <div className={styles.content}>
        <div className={styles.expression}>{entry.expression}</div>
        <div className={styles.result}>= {entry.result}</div>
      </div>
      <div className={styles.footer}>
        <span className={styles.mode}>{entry.mode}</span>
        <span className={styles.time}>{formatTimestamp(entry.timestamp)}</span>
      </div>
      <button
        className={styles.deleteButton}
        onClick={handleDelete}
        aria-label="Delete history entry"
        title="Delete"
      >
        ×
      </button>
    </div>
  )
}
