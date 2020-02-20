import React from 'react'
import styles from './styles.module.scss'


export function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.wrap}>
        <span>© SITO
          <span> {new Date().getFullYear()}</span>
        </span>
      </div>
    </div>
  )
}

