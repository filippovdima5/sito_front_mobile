import React from 'react';
import styles from './Filter.module.scss';
import { setVisFilter } from "../filterListStore";


function Filter() {
    return (
        <div
            onClick={() => (setVisFilter(false))}
            className={styles.Filter}>
            Filter
        </div>
    )
}

export {Filter}