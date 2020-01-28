import React from 'react'
import { Slider } from '../../components/Home/Slider/Slider'
import styles from './Home.module.scss'

// todo: за границами слайдера сделать полупроз

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.wrap}>


        <Slider ratio={'60%'}/>
        


      </div>
    </div>
  )
}

export { Home }