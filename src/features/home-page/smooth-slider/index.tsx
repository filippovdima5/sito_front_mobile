import React from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../../../atoms/Title'
import styles from './styles.module.scss'
import {  Props } from './types'


export function SmoothSlider({ height, img, title, url }: Props) {


  return (
    <div>
      <div style={{ paddingTop: `${height}%` }} className={styles.wrap}>
        <img className={styles.img} src={img} alt={title}/>
        <div className={styles.title}>
          <Title title={title}/>
        </div>
        <Link className={styles.link} to={url}/>
      </div>
    </div>
  )
}