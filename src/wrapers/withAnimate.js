import React from 'react';
import {useTransitionNames} from "../hooks/useTransitionNames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useStore} from "effector-react";

function withAnimate(Component, styles, inStore) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inActive = useStore(inStore);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classNames = useTransitionNames(styles);

    return (
        <TransitionGroup

        >
            {inActive &&
            <CSSTransition
                in = {inActive}
                timeout = {200}
                classNames = {classNames}
            >
                {Component}
            </CSSTransition>
            }
        </TransitionGroup>
    )
}

export {withAnimate}