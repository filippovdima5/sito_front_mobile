import React from 'react';
import animate from './animate.module.scss';
import {useTransitionNames} from "../../../../helpers/hooks/useTransitionNames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import { visFiltersList } from "../filterListStore";
import {useStore} from "effector-react";
import {FiltersList} from "../FiltersList";

function FiltersListAnimate() {
    const $visFiltersList = useStore(visFiltersList);
    const classNames = useTransitionNames(animate);

    return (
        <TransitionGroup
            style = {{position: 'absolute'}}
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

export {FiltersListAnimate as FiltersList}