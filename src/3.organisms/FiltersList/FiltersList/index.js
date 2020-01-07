import React  from 'react';
import styles from '../filtersListStyles.module.scss';

import {useStore} from "effector-react";
import {usedFilters} from "../filtersListStore";

import {Title} from "./views/Title";
import {FilterItem} from "./views/FilterItem";




import {Filter} from "../Filter/animate";


const filtersMap = {
    brands: 'Бренды',
    categories: 'Категории',
    colors: 'Цвета',
    sizes: 'Размеры'
};


function FiltersList() {
    const $usedFilters = useStore(usedFilters);

    return (
        <div className={styles.Filters}>
            <Title/>

            <div className={styles.wrap}>
                <div className={styles.scroll}>

                    {$usedFilters.use.length > 0 &&
                    <section className={`${styles.section} ${styles.active_filters}`}>

                        <h3 className={styles.h3}>Используются сейчас</h3>

                        <div className={styles.filters}>

                            {$usedFilters.use.length > 1 &&
                            <button
                                className={styles.skip_all}
                            >
                                Сбросить всё
                            </button>
                            }

                            <div className={styles.list}>
                                {$usedFilters.use.map(item => (
                                    <FilterItem
                                        title={ filtersMap[item] }
                                        key = { item }
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                    }


                    {
                        $usedFilters.unUse.length > 0 &&
                        <section className={styles.section}>
                            {$usedFilters.use > 0 &&
                            <h3 className={styles.h3}>Остальные</h3>
                            }
                            <div className={styles.filters}>

                                <div className={styles.list}>
                                    {$usedFilters.unUse.map(item => (
                                        <FilterItem
                                            title={ filtersMap[item] }
                                            key = { item }
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    }


                </div>
            </div>

            <Filter/>

        </div>
    )
}


export {FiltersList}