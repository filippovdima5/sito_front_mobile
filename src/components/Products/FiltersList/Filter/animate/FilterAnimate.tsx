import React, { Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useStore } from 'effector-react'
import { useTransitionNames } from '../../../../../helpers/hooks/useTransitionNames'
import { visFilter } from '../../store'
import { Filter } from '../Filter'
import animate from './animate.module.scss'


function FilterAnimate() {
  const $visFilter = useStore(visFilter).vis
  const classNames = useTransitionNames(animate)

  return (
    <TransitionGroup>
      {$visFilter &&
            <CSSTransition timeout = { 300 } classNames = { classNames }>
              <Fragment>
                <Filter/>
              </Fragment>
            </CSSTransition>
      }
    </TransitionGroup>
  )
}

export { FilterAnimate as Filter }