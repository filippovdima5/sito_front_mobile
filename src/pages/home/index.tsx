import React, {useEffect} from 'react'
import { GenderDetected } from '../../features/home-page/gender-detected'
import { HomePage } from '../../features/home-page'
import styles from './styles.module.scss'
import {Redirect, RouteComponentProps} from 'react-router'
import { sexStrToId } from '../../helpers/lib'
import { setCurrentRoute } from '../../stores/env'


type RParams = {
  sex: 'men' | 'women' | undefined
}


function HomeWrap({ sex }: { sex: RParams['sex'] }) {
  switch (sex) {
    case 'men':
    case 'women':
      return <HomePage sexId={sexStrToId(sex)}/>
    case undefined:
      return <GenderDetected height={66}/>
    default:
      return <Redirect to={'/'}/>
  }
}


export function Home({ match: { params: { sex } } }: RouteComponentProps<RParams>) {
  useEffect(() => {setCurrentRoute('/')}, [])
  return (
    <div className={styles.Home}>
      <div className={styles.wrap}>
        <HomeWrap sex={sex}/>
      </div>
    </div>
  )
}
