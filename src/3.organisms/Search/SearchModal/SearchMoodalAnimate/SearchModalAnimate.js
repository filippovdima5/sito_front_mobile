import React, {useRef, useEffect} from 'react';
import styles from '../../searchStyles.module.scss';
import animate from './animate.module.scss';
import {useTransitionNames} from "../../../../hooks/useTransitionNames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {modSearch} from "../../searchStore";
import {useStore} from "effector-react";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';


function SearchModalAnimate() {
    const $modSearch = useStore(modSearch);
    const classNames = useTransitionNames(animate);
    const modalSearchRef = useRef(document.getElementById('search_modal'));

    useEffect(() => {
        if ($modSearch) disableBodyScroll(modalSearchRef.current);
        else enableBodyScroll(modalSearchRef.current);
        return (() => {
            clearAllBodyScrollLocks()
        })
    }, [$modSearch]);


    return (
        <TransitionGroup>
            {$modSearch &&
            <CSSTransition
                in = {$modSearch}
                timeout = {200}
                classNames = {classNames}
            >
                <div id = 'search_modal' className={styles.modal}/>

            </CSSTransition>
            }
        </TransitionGroup>
    )
}

export {SearchModalAnimate}