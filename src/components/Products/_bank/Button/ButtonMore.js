import React from 'react';
import styles from './ButtonMore.module.scss';

function ButtonMore({title}) {
    return (
        <button
            className={styles.ButtonMore}>
            {title}
        </button>
    )
}

export {ButtonMore}