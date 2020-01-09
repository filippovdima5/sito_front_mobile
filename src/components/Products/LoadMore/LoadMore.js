import React from 'react';
import styles from './LoadMore.module.scss';

import {ButtonMore} from "../_bank/Button/ButtonMore";

function LoadMore() {
    return (
        <div className={styles.LoadMore}>
            <span className={styles.text}>Вы просмотрели 555 товаров из 7798</span>

            <ButtonMore title={'Показать ещё'}/>
        </div>
    )
}

export {LoadMore}