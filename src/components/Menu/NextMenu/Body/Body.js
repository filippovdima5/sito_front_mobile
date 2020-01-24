import React, {useEffect, useRef} from 'react';
import styles from './Body.module.scss';
import { $nextMenuState, showMenuWindow } from "../../menuStore";
import {useStore} from "effector-react";
import { disableBodyScroll } from 'body-scroll-lock';
import {createEvent} from "effector";

export const openFromMenu = createEvent(); //todo: вот тут и нужны типы!


function Body({categories}) {
    const {index} = useStore($nextMenuState);
    const nextMenuRef = useRef(document.getElementById('nextMenu'));


    useEffect(() => {
        nextMenuRef.current = document.getElementById('nextMenu');
        disableBodyScroll(nextMenuRef.current);
    }, []);


    return (
        <nav id = {'nextMenu'} className={styles.Body}>
            <ul className={styles.ul}>
                {
                    Object.entries(categories[index]).map(([key, title]) => (
                        <li
                            onClick={() => {
                                openFromMenu(+key);
                                showMenuWindow()
                            }}
                            key={key}
                            className={styles.li}
                        >
                        <span className={styles.link}>
                            {title}
                            {/*<img className={styles.img} src={arrowRight} alt={'go'}/>*/}
                        </span>
                        </li>
                    ))
                }
                <li
                    onClick={() => {
                        openFromMenu(index);
                        showMenuWindow()
                    }}
                    className={styles.li}>
                        <span className={styles.link}>
                             Прочее
                            {/*<img className={styles.img} src={arrowRight} alt={'go'}/>*/}
                        </span>
                </li>
            </ul>

            <div className={styles.space}/>
        </nav>
    )
}

export {Body}