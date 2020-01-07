import React from 'react';
import animate from './animate.module.scss';
import {useTransitionNames} from "../../../../hooks/useTransitionNames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {modSearch} from "../../searchStore";
import {useStore} from "effector-react";
import { SearchModal } from "../SearchModal";


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
                <SearchModal/>
            </CSSTransition>
            }
        </TransitionGroup>
    )
}

export {SearchModalAnimate}