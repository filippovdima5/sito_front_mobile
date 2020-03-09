import React  from 'react'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import {sexStrToId} from '../helpers/lib'
import {RouteComponentProps} from 'react-router'
import {useEffectSafe} from '../helpers/hooks/use-effect-safe'

import { useEvent } from 'effector-react/ssr'
import { START } from 'lib/effector';
import { $setGender } from '../stores/user'
import { $mountProductsPage } from '../features/products-page/store'

import { GenderDetected } from '../features/gender-detected'
import { ProductsPage } from '../features/products-page'



type RParams = {
  sex: 'men' | 'women' | undefined
}


function UseSex({ sexId }: { sexId: 1 | 2 }) {
  const setGender = useEvent($setGender)
  useEffectSafe(() => {
    setGender(sexId)
  }, [])
  
  return <ProductsPage sexId={sexId}/>
}

export function Products({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  switch (match.params.sex) {
    case 'men':
    case 'women': return <UseSex sexId={sexStrToId(match.params.sex)}/>
    default: return <GenderDetected height={66}/>
  }
}

Products[START] = $mountProductsPage