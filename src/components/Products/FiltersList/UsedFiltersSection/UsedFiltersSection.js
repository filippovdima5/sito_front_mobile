import React from 'react';
import styles from './UsedFiltersSection.module.scss';
import {FilterRow} from "./FilterRow/FilterRow";
import {clearAllActiveFilters} from "../filterListStore";


const filtersMap = {
    brands: 'Бренды',
    categories: 'Категории',
    colors: 'Цвета',
    sizes: 'Размеры',
    prices: 'Цена',
    sales: 'Скидка',
};

function UsedFiltersSection({used = false, filtersRow = []}) {

    return (
        <section className={styles.UsedFiltersSection}>

            {
                filtersRow.length > 0 && filtersRow.length < 6 &&
                <h3 className={styles.h3}>{used ? 'Используются сейчас' : 'Остальные'}</h3>
            }

            <div className={styles.filters}>

                {
                    used && filtersRow.length > 1 &&
                    <button
                        onClick = {clearAllActiveFilters}
                        className={styles.skip_all}>
                        Сбросить всё
                    </button>
                }


                <div className={styles.list}>
                    {filtersRow.map(item => (
                        <FilterRow
                            key = {item}
                            title = {filtersMap[item]}
                            typeFilter = {item}
                            isUsed = {used}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export {UsedFiltersSection}