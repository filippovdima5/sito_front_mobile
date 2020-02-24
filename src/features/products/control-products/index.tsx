import React from 'react'
import config from '../../../config'
import { ControlProductsAnimate } from './animate/ControlProductsAnimate'
import { ControlProducts } from './control-products'


function Control() {
  if (config.ssr) return <ControlProducts/>
  else return (
    <ControlProductsAnimate/>
  )
}


export { Control as ControlProducts }