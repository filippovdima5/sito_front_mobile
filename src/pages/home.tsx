import React from 'react'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import { HomePage } from '../features/home-page/home-page'




export function Home() {
  useBodyScrollTop()
  
  return <HomePage sexId={1}/>
}
