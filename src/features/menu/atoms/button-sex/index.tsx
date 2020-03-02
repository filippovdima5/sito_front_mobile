import React from 'react'
import styles from './styles.module.scss'


type Props = {
  sexId: 1 | 2,
  signal: number | boolean,
  currentSex: 1 | 2 | 0
}


export function ButtonSex({ sexId, signal, currentSex }: Props) {
  return(
    <>
      <button className={`${styles.button} ${signal === sexId && styles.buttonScale}`}>{sexId === 1 ? 'Мужское' : 'Женское'}</button>
      <div className={`${styles.bottomLine} ${sexId === currentSex ? styles.bottomLine_true : styles.bottomLine_false}`}/>
    </>
  )
}
