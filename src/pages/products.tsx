import React, { useEffect } from 'react'
import { GenderDetected } from '../features/gender-detected'
import { ProductsPage } from '../features/products-page'
import {RouteComponentProps} from 'react-router'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import {sexStrToId} from '../helpers/lib'
import {useEffectSafe} from '../helpers/hooks/use-effect-safe'
import {setCurrentRoute} from '../stores/env'


type RParams = {
  sex: 'men' | 'women' | undefined
}

// if (prevProps.match.params.sex !== this.props.match.params.sex) toggleSex(sexStrToId(this.props.match.params.sex))

export function Products({ match, history }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  useEffectSafe(() => {
    setCurrentRoute('/products/')
  }, [])
  
  
  
  switch (match.params.sex) {
    case 'men':
    case 'women':
      return <ProductsPage sexId={sexStrToId(match.params.sex)}/>
      
    default: return <GenderDetected height={66} currentRoute={'/products/'} search={history.location.search}/>
  }
}