import React from 'react';
import styles from './NextMenu.module.scss';
import leftArrow from '../../../media/img/svg/leftArrow.svg';

function NextMenu() {
    return (
        <div className={styles.NextMenu}>
            <h2 className={styles.h2}>
                <img src={leftArrow} alt={'back'} className={styles.img}/>
                <span className={styles.span}>
                    Одежда
                </span>
            </h2>
        </div>
    )
}

export {NextMenu}