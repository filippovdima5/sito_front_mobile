import React  from 'react'
import { RouteComponentProps } from 'react-router'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import { sexStrToId } from '../helpers/lib'
import {useEffectSafe} from '../helpers/hooks/use-effect-safe'

import { GenderDetected } from '../features/gender-detected'

import { useEvent } from 'effector-react/ssr'
import { setCurrentRoute } from '../stores/env'
import { $loadBrands } from '../features/brands-page/store'
import { START } from 'lib/effector';

import { BrandsPage } from '../features/brands-page'




type RParams = {
  sex: 'men' | 'women' | undefined
}


export function Brands({ match }: RouteComponentProps<RParams>) {
  const setCurrentRouteEv = useEvent(setCurrentRoute)
  
  useBodyScrollTop()
  useEffectSafe(() => {
    setCurrentRouteEv('/brands/')
  }, [])
  
  switch (match.params.sex) {
    case 'men':
    case 'women':
      return <BrandsPage sexId={sexStrToId(match.params.sex)}/>
    default: return <GenderDetected currentRoute={'/brands/'} height={66}/>
  }
}

Brands[START] = setCurrentRoute