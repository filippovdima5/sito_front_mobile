import React from 'react'
import styles from './styles.module.scss'


type Props = {
  onClick: () => void,
  title: string,
}


export function BtnDone(props: Props) {
  return (
    <div className={styles.wrapBtnDone}>
      <button onClick={props.onClick} className={styles.button}>
        <span className={styles.wrapTitle}>
          <span className={styles.title}>
            {props.title}
          </span>
        </span>
      </button>
    </div>
  )
}