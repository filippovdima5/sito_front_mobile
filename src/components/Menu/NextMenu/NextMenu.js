import React from 'react';
import styles from './NextMenu.module.scss';
import {Header} from "./Header/Header";


function NextMenu() {
    return (
        <div className={styles.NextMenu}>
            <Header/>
        </div>
    )
}

export {NextMenu}