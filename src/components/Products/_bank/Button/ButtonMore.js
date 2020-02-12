import React from 'react'
import styles from './ButtonMore.module.scss'


function ButtonMore({ title, onClick }) {
  return (
    <button
      onClick = {onClick}
      className={styles.ButtonMore}>
      {title}
    </button>
  )
}

export { ButtonMore }