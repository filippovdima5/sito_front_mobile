import React, {useEffect} from 'react'
import { GenderDetected } from '../../features/gender-detected'
import { HomePage } from '../../features/home-page'
import styles from './styles.module.scss'
import {Redirect, RouteComponentProps} from 'react-router'
import { sexStrToId } from '../../helpers/lib'
import { setCurrentRoute } from '../../stores/env'
import { useBodyScrollTop } from '../../helpers/hooks/use-body-scroll-top'


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
      return <Redirect to={'/home'}/>
  }
}


export function Home({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  useEffect(() => {setCurrentRoute('/home/')}, [])
  
  if (match.url === '/') return <Redirect to={'/home'}/>
  
  return (
    <div className={styles.Home}>
      <div className={styles.wrap}>
        <HomeWrap sex={match.params.sex}/>
      </div>
    </div>
  )
}
