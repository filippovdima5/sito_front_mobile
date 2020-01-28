import React from 'react'
import styles from './Slider.module.scss'


type Props = {
  ratio: string,
}

function Slider({ ratio }: Props) {
  return(
    <div style={{ paddingBottom: ratio }} className={styles.Slider}>

    </div>
  )
}

export { Slider }