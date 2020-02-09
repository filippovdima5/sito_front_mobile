import React from 'react'
import styles from './Menu.module.scss'
import { Header } from './Header/Header'
import { Body } from './Body/Body'
import { NextMenu } from './NextMenu/animate/NextMenuAnimate'



function Menu() {
  return (
    <div className={styles.Menu}>
      <Header sexId={1}/>

      {/*{*/}
      {/*  !genderInfo && (*/}
      {/*    <div className={styles.wrapGender}>*/}
      {/*      <GenderDetected height={30}/>*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*}*/}

      <Body sexId={1}/>
      <NextMenu sex_id = {1}/>
    </div>
  )
}

export { Menu }