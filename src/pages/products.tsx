import React  from 'react'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import {sexStrToId} from '../helpers/lib'
import {RouteComponentProps} from 'react-router'

import { GenderDetected } from '../features/gender-detected'
import { ProductsPage } from '../features/products-page'


type RParams = {
  sex: 'men' | 'women' | undefined
}

// if (prevProps.match.params.sex !== this.props.match.params.sex) toggleSex(sexStrToId(this.props.match.params.sex))

export function Products({ match, history }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  
  
  switch (match.params.sex) {
    case 'men':
    case 'women':
      return <ProductsPage sexId={sexStrToId(match.params.sex)}/>
      
    default: return <GenderDetected height={66}/>
  }
}