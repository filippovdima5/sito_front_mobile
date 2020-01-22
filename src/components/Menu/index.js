import React, {Fragment} from 'react';
import styles from './styles/Menu.module.scss';
import {Header} from './Header/Header';
import {showMenuWindow} from "./menuStore";


import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useTransitionNames} from "../../helpers/hooks/useTransitionNames";
import mainAnimate from './styles/mainMenuAnimate.module.scss';

import { $isShowMenu, $nextMenuState } from "./menuStore";
import {useStore} from "effector-react";





function Menu() {
    const mainShow = useStore($isShowMenu);
    const nextShow = useStore($nextMenuState);
    const mainMenuClassNames = useTransitionNames(mainAnimate);

    return (
        <TransitionGroup className={`${styles.Menu} ${mainShow ? styles.Menu_open : styles.Menu_close}`}>
            {mainShow &&
            <CSSTransition
                in = {mainShow}
                timeout = {300}
                classNames = {mainMenuClassNames}
            >
                    <div className={styles.menuWrap}>
                        <Header/>
                            <div className={`${styles.MainMenu} ${styles.menu_items} ${mainAnimate.main_menu}`}/>
                            <div className={`${styles.NextMenu} ${styles.menu_items}`}/>



                        {/*<div className={`${styles.backLogMain} ${styles.backLog_items}`}/>*/}
                        {/*<div  className={`${styles.backLogNext} ${styles.backLog_items}`}/>*/}

                    </div>
                </CSSTransition>
            }
            <div
                onClick={() => showMenuWindow()}
                className={styles.substrateClose}
            />
        </TransitionGroup>
    )
}

export {Menu}