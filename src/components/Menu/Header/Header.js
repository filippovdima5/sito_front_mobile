import React from 'react';
import styles from './Header.module.scss';
import {setSexId} from "../../../stores/user";
import {$sexId} from "../../../stores/user";
import {useStore} from "effector-react";


const Header = React.memo(() => {
    const sexId = useStore($sexId);

    return (
        <div className={styles.Header}>
            <div className={styles.buttonWrap}>
                <button onClick={() => (setSexId(1))} className={styles.button}>Мужское</button>
                <div className={`${styles.bottomLine} ${sexId === 1 ? styles.bottomLine_true : styles.bottomLine_false}`}/>
            </div>

            <div onClick={() => (setSexId(2))} className={styles.buttonWrap}>
                <button className={styles.button}>Женское</button>
                <div className={`${styles.bottomLine} ${sexId === 2 ? styles.bottomLine_true : styles.bottomLine_false}`}/>
            </div>
        </div>
    )
});

export {Header}