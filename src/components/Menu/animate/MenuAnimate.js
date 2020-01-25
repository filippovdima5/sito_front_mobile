import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useStore } from 'effector-react'
import { Menu } from '../Menu'
import { useTransitionNames } from '../../../helpers/hooks/useTransitionNames'
import { $isShowMenu, showMenuWindow } from '../menuStore'
import animate from './animate.module.scss'


function MenuAnimate() {
  const classNames = useTransitionNames(animate)
  const isShowMenu = useStore($isShowMenu)

  return (
    <TransitionGroup>
      <div
        onClick = { () => showMenuWindow() }
        className={`${animate.backLog} ${isShowMenu ? animate.backLog_open : animate.backLog_close}`}
      />

      {isShowMenu &&
            <CSSTransition
              in = {isShowMenu}
              timeout = {300}
              classNames = {classNames}
            >
              <Menu/>
            </CSSTransition>
      }
    </TransitionGroup>
  )
}

export { MenuAnimate as Menu }