import React from 'react';
import styles from './FiltersList.module.scss';
import { setVisFiltersList } from "./filterListStore";

import {Header} from "./_bank/Header/Header";
import {Filter} from "./Filter/animate/FilterAnimate";
import {UsedFiltersSection} from "./UsedFiltersSection/UsedFiltersSection";

import {usedFilters} from "./filterListStore";
import {useStore} from "effector-react";


const handleClose = () => (setVisFiltersList(false));

function FiltersList() {
    const $usedFilters = useStore(usedFilters);

    return (
        <div className={styles.FiltersList}>

            <Header title={'Фильтры'} close={handleClose}/>

            <div className={styles.wrap}>
                <div>
                    <UsedFiltersSection used={true} filtersRow={$usedFilters.use}/>
                    <UsedFiltersSection filtersRow={$usedFilters.unUse}/>
                    <UsedFiltersSection filtersRow={$usedFilters.unUse}/>
                    <UsedFiltersSection filtersRow={$usedFilters.unUse}/>
                    <UsedFiltersSection filtersRow={$usedFilters.unUse}/>
                    <UsedFiltersSection filtersRow={$usedFilters.unUse}/>
                </div>
            </div>

            <Filter/>
        </div>
    )
}

export {FiltersList}
