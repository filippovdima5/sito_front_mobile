import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useStore } from 'effector-react'
import { NextMenu } from '../NextMenu'
import { useTransitionNames } from '../../../../helpers/hooks/useTransitionNames'
import { $nextMenuState } from '../../menuStore'
import animate from './animate.module.scss'


function NextMenuAnimate({ categories, sex_id }) {
  const classNames = useTransitionNames(animate)
  const { opened } = useStore($nextMenuState)

  return (
    <TransitionGroup>
      <div className={`${animate.backLog} ${opened ? animate.backLog_open : animate.backLog_close}`}/>

      {opened &&
          <CSSTransition
            in = { opened }
            timeout = { 300 }
            classNames = { classNames }
          >
            <NextMenu sex_id={sex_id} categories = {categories}/>
          </CSSTransition>
      }
    </TransitionGroup>
  )
}

export { NextMenuAnimate as NextMenu }