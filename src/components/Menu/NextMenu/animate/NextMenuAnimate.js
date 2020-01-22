import React from 'react';
import animate from './animate.module.scss';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useTransitionNames} from "../../../../helpers/hooks/useTransitionNames";
import {NextMenu} from "../NextMenu";
import {useStore} from "effector-react";
import {$nextMenuState} from "../../menuStore";

function NextMenuAnimate() {
    const classNames = useTransitionNames(animate);
    const { opened } = useStore($nextMenuState);

    return (
      <TransitionGroup>
          {opened &&
          <CSSTransition
              in = { opened }
              timeout = { 300 }
              classNames = { classNames }
          >
              <NextMenu/>
          </CSSTransition>
          }
      </TransitionGroup>
    )
}

export {NextMenuAnimate as NextMenu}