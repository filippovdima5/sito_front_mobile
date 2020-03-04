import React from 'react'
import { GenderDetected} from '../features/gender-detected'
import { HomePage} from '../features/home-page/home-page'
import { Redirect, RouteComponentProps } from 'react-router'
import { sexStrToId} from '../helpers/lib'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import {useEffectSafe} from '../helpers/hooks/use-effect-safe'
import {setCurrentRoute} from '../stores/env'


type RParams = {
  sex: 'men' | 'women' | undefined
}


function HomeWrap({ sex }: { sex: RParams['sex'] }) {
  switch (sex) {
    case 'men':
    case 'women':
      return <HomePage sexId={sexStrToId(sex)}/>
    default: return <GenderDetected currentRoute={'/home/'} height={66}/>
  }
}


export function Home({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  useEffectSafe(() => {
    setCurrentRoute('/home/')
  }, [])
  
  
  if (match.url === '/') return <Redirect to={'/home'}/>
  return <HomeWrap  sex={match.params.sex}/>
}
