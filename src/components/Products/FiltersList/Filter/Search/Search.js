import React from 'react';
import styles from './Search.module.scss';

function Search() {
    return (
        <div className={styles.Search}>
            <div className={styles.inputWrap}>
                <input
                    placeholder={'Поиск'}
                    type={'text'}
                    className={styles.input}
                />
            </div>
        </div>
    )
}

export {Search}