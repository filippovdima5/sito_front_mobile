import React from 'react';
import styles from '../../filtersListStyles.module.scss';

import {setVisFilter} from "../../filtersListStore";


function FilterItem({title}) {
    return (
        <div
            onClick={() => (setVisFilter(true))}
            className={styles.filter_item}>

            <div className={styles.item_wrap}>
                <div className={styles.item}>
                    <div className={styles.item_text_wrap}>
                        <div className={styles.title_filter_wrap}>
                            <div className={styles.title_filter}>{title}</div>
                        </div>

                        <div className={styles.active_filters_wrap}>
                            <div className={styles.active_filters}>Адидас, хуедас, kmednkek, kdlwnfw, erklnfejl, jrnwlj , whjerrrrrrrrhh</div>
                        </div>
                    </div>

                    <div className={styles.item_arrow_wrap}>
                        <svg>
                            <path fillRule="evenodd" d="M10.007 4.003L18.004 12l-7.997 7.997-1.414-1.414L15.176 12 8.593 5.417z"/>
                        </svg>
                    </div>

                </div>
            </div>

            <button
                className={styles.skip_one}
            >
                Сбросить
            </button>
        </div>
    )
}

export {FilterItem}