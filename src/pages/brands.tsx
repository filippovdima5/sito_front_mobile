import React  from 'react'
import { RouteComponentProps } from 'react-router'
import { GenderDetected } from '../features/gender-detected'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import { sexStrToId } from '../helpers/lib'
import { BrandsPage } from '../features/brands-page'
import { setCurrentRoute } from '../stores/env'
import {useEffectSafe} from '../helpers/hooks/use-effect-safe'



type RParams = {
  sex: 'men' | 'women' | undefined
}


export function Brands({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  useEffectSafe(() => {
    setCurrentRoute('/brands/')
  }, [])
  
  switch (match.params.sex) {
    case 'men':
    case 'women':
      return <BrandsPage sexId={sexStrToId(match.params.sex)}/>
    default: return <GenderDetected currentRoute={'/brands/'} height={66}/>
  }
}

