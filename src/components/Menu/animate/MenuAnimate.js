import React from 'react';
import animate from './animate.module.scss';
import {Menu} from "../Menu";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useTransitionNames} from "../../../helpers/hooks/useTransitionNames";
import {useStore} from "effector-react";
import {$isShowMenu} from "../menuStore";


function MenuAnimate() {
    const classNames = useTransitionNames(animate);
    const isShowMenu = useStore($isShowMenu);

    return (
        <TransitionGroup
            style = {{position: 'absolute'}}
        >
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

export {MenuAnimate as Menu}