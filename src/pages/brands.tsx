import React  from 'react'
import { RouteComponentProps } from 'react-router'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import { sexStrToId } from '../helpers/lib'
import {useEffectSafe} from '../helpers/hooks/use-effect-safe'

import { useEvent } from 'effector-react/ssr'
import { $setGender } from '../stores/user'

import { GenderDetected } from '../features/gender-detected'
import { BrandsPage } from '../features/brands-page'


type RParams = {
  sex: 'men' | 'women' | undefined
}


function UseSex({ sexId }: { sexId: 1 | 2 }) {
  const setGender = useEvent($setGender)
  
  useEffectSafe(() => {
    setGender(sexId)
  }, [])
  
  return <BrandsPage sexId={sexId}/>
}


export function Brands({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  
  switch (match.params.sex) {
    case 'men':
    case 'women': return <UseSex sexId={sexStrToId(match.params.sex)}/>
    default: return <GenderDetected height={66}/>
  }
}

