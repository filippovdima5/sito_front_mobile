import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import { $userInfo, setSexId } from '../../stores/user/user'
import styles from './Home.module.scss'
import { GenderDetected } from './GenderDetected/GenderDetected'
import { HomePage } from './HomePage/HomePage'


function HomeWrap() {
  const { sex_id } = useStore($userInfo)
  useEffect(() => {
    // todo: Вместо local - будет isomorphicStorage!
    const sexId = localStorage.getItem('sex_id')
    if (sexId === '1' || sexId === '2') setSexId(sexId === '1' ? 1 : 2)
  }, [])


  if (sex_id) return (
    <HomePage sexId = {sex_id} />
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