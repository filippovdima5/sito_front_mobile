import React, { useEffect, useState } from 'react'
import config from '../../../../config'
import { Animate } from './animate'
import { ControlProducts } from './control-products'


export function Controls() {
  const [ animate, setAnimate ] = useState(false)
  useEffect(() => { setAnimate(!config.ssr) }, [])
  
  if (animate) return <Animate/>
  else return <ControlProducts/>
}

