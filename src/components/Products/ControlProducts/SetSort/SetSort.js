import React from 'react';
import styles from './SetSort.module.scss';
import {useStore} from "effector-react";
import {productsSort} from "../../productsStore";
import {setSort} from "../../../../pages/Products/store";

function SetSort() {
    const sort = useStore(productsSort);

    return (
        <div className={styles.SetSort}>
            <select
                onChange={(e) => setSort(e.target.value)}
                aria-readonly={true}
                value={sort}
                className={styles.select_main}>
                <option value={'update_up'}>По новизне</option>
                <option value={'price_up'}>По цене</option>
                <option value={'sale_up'} >По размеру скидики</option>
            </select>
        </div>
    )
}

export {SetSort}