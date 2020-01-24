import React from 'react';
import styles from './NextMenu.module.scss';
import {Header} from "./Header/Header";
import {Body} from "./Body/Body";





function NextMenu({categories}) {



    return (
        <div className={styles.NextMenu}>
            <Header/>
            <Body  categories={categories}/>
        </div>
    )
}

export {NextMenu}