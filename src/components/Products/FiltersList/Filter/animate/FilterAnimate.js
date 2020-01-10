import React, {Fragment} from 'react';
import animate from './animate.module.scss';
import {useTransitionNames} from "../../../../../hooks/useTransitionNames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {visFilter} from "../../filterListStore";
import {useStore} from "effector-react";

import {Filter} from "../Filter";

function FilterAnimate() {
    const $visFilter = useStore(visFilter).vis;
    const classNames = useTransitionNames(animate);

    return (
        <TransitionGroup>
            {$visFilter &&
            <CSSTransition

                timeout = { 200 }
                classNames = { classNames }
            >
                <Fragment>
                    <Filter/>
                </Fragment>
            </CSSTransition>
            }
        </TransitionGroup>
    )
}

export {FilterAnimate as Filter}