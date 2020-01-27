import React from 'react';
import styles from './Item.module.scss';
import {setFilter} from "../../../store";
import {filtersState} from "../../../../../../pages/Products/store";
import {useStore} from "effector-react";

function Item({id, title, count, disabled, type}) {
    const $activeFilters = useStore(filtersState)[type];

    return (
        <label className={`${styles.Item} ${disabled && styles.disabled}`}>
            <input
                readOnly = {true}
                checked = {$activeFilters.includes(id)}
                onClick={() => setFilter({id, type})}
                disabled={disabled}
                type={'checkbox'}
                className={styles.checkbox}
            />
            <span className={styles.icon}/>
            <span className={styles.title}>{title}</span>

            <span className={styles.count}>{count}</span>
        </label>
    )
}

export {Item}