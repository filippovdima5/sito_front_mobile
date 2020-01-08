import React from 'react';
import styles from './FilterRow.module.scss';
import {setVisFilter} from "../../filterListStore";
import {RightArrow} from "../../../../../img/svg/RightArrow";

function FilterRow({title}) {
    return (
        <div
            onClick={() => (setVisFilter(true))}
            className={styles.filterRow}>

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
                        <RightArrow/>
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

export {FilterRow}