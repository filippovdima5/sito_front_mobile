import React from 'react'
import styles from './styles.module.scss'


type Props = {
  title: string,
  check: boolean,
  event: () => void,
}

export function CheckRow(props: Props) {
  return (
    <label className={`${styles.checkRow} ${props.check && styles.disabled}`}>
      <input
        readOnly={true}
        checked={props.check}
        onClick={props.event}
        disabled={props.check}
        type={'checkbox'}
        className={styles.checkbox}
      />
      <span className={styles.icon}/>
      <span>{props.title}</span>
    </label>
  )
}
