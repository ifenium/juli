import React, { useState } from 'react'
import styles from './History.module.css'
import { HistoryItem } from './HistoryItem/HistoryItem'
import { useCalculatorContext } from '../../context/CalculatorContext'

export function History() {
  const { state, clearHistory, deleteHistoryItem } = useCalculatorContext()
  const [isExpanded, setIsExpanded] = useState(true)

  const handleClearHistory = () => {
    if (state.history.length > 0) {
      const confirm = window.confirm('Clear all calculation history?')
      if (confirm) {
        clearHistory()
      }
    }
  }

  return (
    <div className={styles.historyContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>History</h2>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse history' : 'Expand history'}
          aria-expanded={isExpanded}
        >
          <span className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className={styles.content}>
          {state.history.length === 0 ? (
            <div className={styles.empty}>
              <p>No calculations yet</p>
              <p className={styles.hint}>Your calculations will appear here</p>
            </div>
          ) : (
            <>
              <div className={styles.list}>
                {state.history.map((entry) => (
                  <HistoryItem
                    key={entry.id}
                    entry={entry}
                    onDelete={deleteHistoryItem}
                  />
                ))}
              </div>
              <button
                className={styles.clearButton}
                onClick={handleClearHistory}
                title="Clear all history"
              >
                Clear History
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
