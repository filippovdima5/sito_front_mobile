import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {Redirect, RouteComponentProps} from 'react-router'
import {GenderDetected} from '../gender-detected'
import {useBodyScrollTop} from '../../helpers/hooks/use-body-scroll-top'
import { sexStrToId } from '../../helpers/lib'
import {setCurrentRoute} from '../../stores/env'
import { Brands } from './brands'


type RParams = {
  sex: 'men' | 'women' | undefined
}


function Controller({ sex }: { sex: RParams['sex'] }) {
  switch (sex) {
    case 'men':
    case 'women':
      return <Brands sexId={sexStrToId(sex)}/>
    case undefined:
      return <GenderDetected height={66}/>
    default: return <Redirect to={'/brands'}/>
  }
}


export function BrandsPage({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  useEffect(() => {setCurrentRoute('/brands/')})
  
  
  return (
    <div className={styles.brands}>
      <div className={styles.wrap}>
        <Controller sex={match.params.sex}/>
      </div>
    </div>
  )
}
