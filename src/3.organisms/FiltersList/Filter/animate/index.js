import React, {Fragment}  from 'react';
import animate from './animate.module.scss';
import {useTransitionNames} from "../../../../hooks/useTransitionNames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {setVisFilter, visFilter} from "../../filtersListStore";
import { useStore } from "effector-react";

function Filter() {
    const $visFilter = useStore(visFilter);
    const classNames = useTransitionNames(animate);

    return (
        <TransitionGroup>
            {$visFilter &&
            <CSSTransition
                in = {$visFilter}
                timeout = { 200 }
                classNames = { classNames }
            >
                <Fragment>
                    <div
                        onClick={() => (setVisFilter(false))}
                        className={animate.main}>
                        FILTER
                    </div>
                </Fragment>
            </CSSTransition>
            }
        </TransitionGroup>
    )
}

export {Filter}