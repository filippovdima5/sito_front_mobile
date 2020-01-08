import React from 'react';
import styles from './Header.module.scss';
import {Close} from "../../../../../img/svg/Close";


function Header({title, close }) {

    return (
        <div className={styles.Header}>
            <div className={styles.title_wrap}>

                <div className={styles.text_wrap}>
                    <div className={styles.text}>{title}</div>
                </div>

                {
                    close &&
                    <div className={styles.btn_wrap}>
                        <button onClick={close} className={styles.btn}>
                          <Close/>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export {Header}