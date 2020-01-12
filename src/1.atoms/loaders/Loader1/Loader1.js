import React from 'react';
import styles from './Loader1.module.scss';

function Loader1({style}) {
    return (
        <div style={style} className={styles.Loader1}>
            <div className={styles.load1}>
                <div className={styles.line}/>
                <div className={styles.line}/>
                <div className={styles.line}/>
            </div>
        </div>
    )
}

export {Loader1}