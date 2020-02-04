import React from 'react'
import { useStore } from 'effector-react'
import { $userInfo } from '../../stores/user/user'
import styles from './Home.module.scss'
import { GenderDetected } from './GenderDetected/GenderDetected'


function HomeWrap() {
  const { sex_id } = useStore($userInfo)


  if (localStorage.getItem('sex_id') || sex_id) return (
    <div>homePage {localStorage.getItem('sex_id')}</div>
  )

  return (
    <GenderDetected/>
  )
}


function Home() {



  return (
    <div className={styles.Home}>
      <div className={styles.wrap}>
        <HomeWrap/>

        {/*<Slider*/}
        {/*  data = {data1Slider}*/}
        {/*  ratio={'60%'}*/}
        {/*/>*/}

        {/*<Slider*/}
        {/*  data = {data1Slider3}*/}
        {/*  ratio={'15%'}*/}
        {/*/>*/}

        {/*<Slider*/}
        {/*  data = {data1Slider2}*/}
        {/*  ratio={'60%'}*/}
        {/*/>*/}

        {/*<Slider*/}
        {/*  data = {data1Slider4}*/}
        {/*  ratio={'30%'}*/}
        {/*/>*/}


        {/*<Slider*/}
        {/*  data = {data1Slider3}*/}
        {/*  ratio={'60%'}*/}
        {/*/>*/}

        {/*<Slider*/}
        {/*  data = {data1Slider5}*/}
        {/*  ratio={'40%'}*/}
        {/*/>*/}

      </div>
    </div>
  )
}

export { Home }