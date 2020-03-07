import React, { useState, useEffect, useRef } from 'react'
import { useScroll } from 'react-use'
import { CSSTransition } from 'react-transition-group'
import { ControlProducts } from '../control-products'
import { useTransitionNames } from '../../../../../helpers/hooks/use-transition-names'
import animate from './animate.module.scss'


// todo: Нужно как то эффективнее отслеживать скролл! иначе на каждый скролик, все обновляется!

function ControlProductsAnimate() {

  const classNames = useTransitionNames(animate)
  const [show, setShow] = useState(false)


  const bodyRef = useRef(document.body)
  const prevPosY = useRef(0)
  const curPosY = useScroll(bodyRef).y

  useEffect(() => {
    if (curPosY < prevPosY.current && !show && curPosY > 100) setShow(true)
    if ((curPosY > prevPosY.current && show) || curPosY === 0) setShow(false)
    prevPosY.current = curPosY
  }, [curPosY, show])


  return (
    <CSSTransition
      in = {show}
      timeout = {300}
      classNames = {classNames}
    >
      <ControlProducts/>
    </CSSTransition>
  )
}

export { ControlProductsAnimate }