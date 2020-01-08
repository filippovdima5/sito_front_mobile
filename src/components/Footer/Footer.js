import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.wrap}>
                <span>© SITO  <span>2020</span></span>
            </div>
        </div>
    )
}

export {Footer}