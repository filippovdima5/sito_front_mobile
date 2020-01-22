import React from 'react';
import styles from './Header.module.scss';
import {closeNextMenu} from "../../menuStore";
import leftArrow from "../../../../media/img/svg/leftArrow.svg";
import {$nextMenuState} from "../../menuStore";
import {useStore} from "effector-react";

function Header() {
    const {title} = useStore($nextMenuState);

    return (
        <h2
            onClick={() => closeNextMenu()}
            className={styles.Header}
        >
            <img src={leftArrow} alt={'back'} className={styles.img}/>
            <span className={styles.span}>
                {title}
             </span>
        </h2>
    )
}

export {Header}