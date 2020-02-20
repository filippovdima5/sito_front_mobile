import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useStore } from 'effector-react'
import { useTransitionNames } from '../../../../helpers/hooks/useTransitionNames'
import { modSearch } from '../../searchStore'
import { Modal } from '../Modal'
import animate from './animate.module.scss'


function SearchModalAnimate() {
  const $modSearch = useStore(modSearch)
  const classNames = useTransitionNames(animate)

  return (
    <TransitionGroup

    >
      {$modSearch &&
            <CSSTransition
              in = {$modSearch}
              timeout = {300}
              classNames = {classNames}
            >
              <Modal/>
            </CSSTransition>
      }
    </TransitionGroup>
  )
}

export { SearchModalAnimate as Modal }