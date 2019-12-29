import React from 'react';
import styles from '../searchStyles.module.scss';

const SearchInput = React.memo(() => {
    return (
        <input
            placeholder={'Поиск по ключевому слову'}
            className={styles.input}
            type={'text'}
        />
    )
});

export {SearchInput}