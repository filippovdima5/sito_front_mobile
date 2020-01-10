import React, {useMemo} from 'react';
import styles from './FilterRow.module.scss';
import {setVisFilter, activeFilters} from "../../filterListStore";
import rightArrowSVG from "../../../../../img/svg/rightArrow.svg";
import {useStore} from "effector-react";


function FilterRow({title, typeFilter}) {
    const $activeFilters = useStore(activeFilters)[typeFilter];

    const activeFiltersString = useMemo(() => {
        let string =  $activeFilters.join(' | ');
        string = string.length > 37 ? string.substr(0, 34) + '...' : string;
        return string
    }, [$activeFilters]);


    return (
        <div
            onClick={() => (setVisFilter({title, type: typeFilter, vis: true}))}
            className={styles.filterRow}>

            <div className={styles.item_wrap}>
                <div className={styles.item}>
                    <div className={styles.item_text_wrap}>
                        <div className={styles.title_filter_wrap}>
                            <div>{title}</div>
                        </div>

                        <div className={styles.active_filters_wrap}>
                            <div>{activeFiltersString}</div>
                        </div>
                    </div>

                    <div className={styles.item_arrow_wrap}>
                        <img src={rightArrowSVG} alt={'go'} className={styles.svg}/>
                    </div>

                </div>
            </div>

            <button className={styles.skip_one}>
                Сбросить
            </button>
        </div>
    )
}

export {FilterRow}