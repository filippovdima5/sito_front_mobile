import React from 'react'
import styles from '../Slider.module.scss'
import { SlideProps } from '../Slider'


export function Slide({ title, img, url }: SlideProps) {
  return (
    <a
      href={url}
      target = '_blank'
      rel="noopener noreferrer"
      className={styles.mainWrap}
    >
      <div className={styles.title}>{title}</div>

      <img className={styles.img} alt={''} src={img}/>
    </a>
  )
}