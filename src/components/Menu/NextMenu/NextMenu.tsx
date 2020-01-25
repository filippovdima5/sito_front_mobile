import React from 'react'
import styles from './NextMenu.module.scss'
import { Header } from './Header/Header'
import { Body } from './Body/Body'


type Props = {
  sex_id: 1 | 2 ,
  categories: Array<string>,
  topStyle: number,
}

function NextMenu({ categories, sex_id, topStyle }: Props) {

  return (
    <div style={{ top: topStyle }} className={styles.NextMenu}>
      <Header/>
      <Body  sex_id = {sex_id} categories={categories}/>
    </div>
  )
}

export { NextMenu }