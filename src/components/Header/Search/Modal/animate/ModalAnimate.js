import React from 'react';
import animate from './animate.module.scss';
import {useTransitionNames} from "../../../../../hooks/useTransitionNames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {modSearch} from "../../searchStore";
import {useStore} from "effector-react";
import { Modal} from "../Modal";


function SearchModalAnimate() {
    const $modSearch = useStore(modSearch);
    const classNames = useTransitionNames(animate);

    return (
        <TransitionGroup

        >
            {$modSearch &&
            <CSSTransition
                in = {$modSearch}
                timeout = {200}
                classNames = {classNames}
            >
               <Modal/>
            </CSSTransition>
            }
        </TransitionGroup>
    )
}

export {SearchModalAnimate as Modal}