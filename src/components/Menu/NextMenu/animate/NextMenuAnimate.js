import React from 'react';
import animate from './animate.module.scss';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useTransitionNames} from "../../../../helpers/hooks/useTransitionNames";
import {NextMenu} from "../NextMenu";
import {useStore} from "effector-react";
import {$nextMenuState} from "../../menuStore";

function NextMenuAnimate({categories}) {
    const classNames = useTransitionNames(animate);
    const { opened } = useStore($nextMenuState);

    return (
      <TransitionGroup>
          <div className={`${animate.backLog} ${opened ? animate.backLog_open : animate.backLog_close}`}/>

          {opened &&
          <CSSTransition
              in = { opened }
              timeout = { 300 }
              classNames = { classNames }
          >
              <NextMenu categories = {categories}/>
          </CSSTransition>
          }
      </TransitionGroup>
    )
}

export {NextMenuAnimate as NextMenu}