import React from 'react'
// @ts-ignore
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useStore } from 'effector-react'
import { useTransitionNames } from '../../../../helpers/hooks/useTransitionNames'
import { visFiltersList } from '../store'
import { FiltersList } from '../FiltersList'
import animate from './animate.module.scss'


function FiltersListAnimate() {
  const $visFiltersList = useStore(visFiltersList)
  const classNames = useTransitionNames(animate)

  return (
    <TransitionGroup
      style = {{ position: 'absolute' }}
    >
      {$visFiltersList &&
            <CSSTransition
              in = {$visFiltersList}
              timeout = {300}
              classNames = {classNames}
            >
              <FiltersList/>
            </CSSTransition>
      }
    </TransitionGroup>
  )
}

export { FiltersListAnimate as FiltersList }