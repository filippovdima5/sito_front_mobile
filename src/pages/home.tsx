import React from 'react'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import { Redirect, RouteComponentProps } from 'react-router'
import { sexStrToId} from '../helpers/lib'

import { useEvent } from 'effector-react/ssr'
import { $setGender } from '../stores/user'

import { GenderDetected} from '../features/gender-detected'
import { HomePage} from '../features/home-page/home-page'
import {useEffectSafe} from '../helpers/hooks/use-effect-safe'



type RParams = {
  sex: 'men' | 'women' | undefined
}


function UseGender({ sexId }: { sexId: 1 | 2 }) {
  const setGender = useEvent($setGender)
  useEffectSafe(() => {
    setGender(sexId)
  
  }, [])
  return (
    <HomePage sexId={sexId}/>
  )
}


function HomeWrap({ sex }: { sex: RParams['sex'] }) {
  switch (sex) {
    case 'men':
    case 'women': return <UseGender sexId={sexStrToId(sex)}/>
    default: return <GenderDetected height={66}/>
  }
}


export function Home({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  
  if (match.url === '/') return <Redirect to={'/home'}/>
  return <HomeWrap sex={match.params.sex}/>
}
