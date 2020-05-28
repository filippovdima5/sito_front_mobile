import React, { FC } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useTransitionNames } from '../hooks/use-transition-names'


type Props = {
  flag: boolean,
  styles: any,
  wrapStyles?: React.CSSProperties,
  timeout?: number,
  onEntered?: () => void,
}

export const Animate: FC<Props> = (props) => {
  const classNames = useTransitionNames(props.styles)
  
  return (
    <TransitionGroup {...{ style: props.wrapStyles }}>
      { props.flag && (
        <CSSTransition
          onEntered={props.onEntered}
          timeout={props.timeout ?? 300}
          classNames={classNames}
        >
          { props.children }
        </CSSTransition>
      ) }
    </TransitionGroup>
  )
}


