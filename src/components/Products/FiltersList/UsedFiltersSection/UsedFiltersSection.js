import React from 'react';
import styles from './UsedFiltersSection.module.scss';
import {FilterRow} from "./FilterRow/FilterRow";

const filtersMap = {
    brands: 'Бренды',
    categories: 'Категории',
    colors: 'Цвета',
    sizes: 'Размеры'
};

function UsedFiltersSection({used = false, filtersRow = []}) {
    return (
        <section className={styles.UsedFiltersSection}>

            {
                filtersRow.length > 0 && filtersRow.length < 4 &&
                <h3 className={styles.h3}>{used ? 'Используются сейчас' : 'Остальные'}</h3>
            }

            <div className={styles.filters}>

                {
                    used && filtersRow.length > 1 &&
                    <button className={styles.skip_all}>
                        Сбросить всё
                    </button>
                }


                <div className={styles.list}>
                    {filtersRow.map(item => (
                        <FilterRow
                            key = {item}
                            title = {filtersMap[item]}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export {UsedFiltersSection}