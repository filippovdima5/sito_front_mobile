import React, { useEffect, useState, useCallback } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useStore } from 'effector-react'
import { NextMenu } from '../NextMenu'
import { useTransitionNames } from '../../../../helpers/hooks/useTransitionNames'
import { $nextMenuState, showMenuWindow } from '../../menuStore'
import animate from './animate.module.scss'


function NextMenuAnimate({ categories = [], sex_id }) {
  const classNames = useTransitionNames(animate)
  const { opened } = useStore($nextMenuState)



  // TODO: Тут представлен костыль по лечению проблем верстки
  // nextMenu позиционировано относительно подвижной хуйни, и если она на телефоне продолжает двигаться, то к моменту открытия пиздец
  // по хорошему нужно МЕНЯТЬ ВЕРСТКУ
  const [ topNextMenu, setTopNextMenu ] = useState(0)
  const setTop = useCallback(() => {
    const { top } = document.getElementById('app').getBoundingClientRect()
    setTopNextMenu( 50 - top)
  }, [setTopNextMenu])
  useEffect(() => {setTop()}, [setTop])



  return (
    <TransitionGroup>
      <div
        onClick={() => showMenuWindow()}
        style={{ top: topNextMenu }}
        className={`${animate.backLog} ${opened ? animate.backLog_open : animate.backLog_close}`}
      />
      {opened &&
          <CSSTransition
            onEntered = {setTop}
            in = { opened }
            timeout = { 300 }
            classNames = { classNames }
          >
            <NextMenu sex_id={sex_id} categories = {categories} topStyle = { topNextMenu } />
          </CSSTransition>
      }

    </TransitionGroup>
  )
}

export { NextMenuAnimate as NextMenu }