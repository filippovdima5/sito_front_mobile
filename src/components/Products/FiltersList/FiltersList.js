import React, {useState} from 'react';
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import styles from './FiltersList.module.scss';
import {setVisFiltersList, usedFilters} from "./filterListStore";

import {Header} from "./_bank/Header/Header";
import {Filter} from "./Filter/animate/FilterAnimate";
import {UsedFiltersSection} from "./UsedFiltersSection/UsedFiltersSection";
import { DoneBtn } from "./_bank/DoneBtn/DoneBtn";


import {useStore} from "effector-react";


const handleClose = () => (setVisFiltersList(false));

function FiltersList() {
    const $usedFilters = useStore(usedFilters);
    const [visDone, setVisDone] = useState(false);
    useUpdateEffect(() => {if (!visDone) setVisDone(true)});



    return (
        <div className={styles.FiltersList}>

            <Header title={'Фильтры'} close={handleClose}/>

            <div className={styles.wrap}>
                <div>
                    <UsedFiltersSection  used={true} filtersRow={$usedFilters.use}/>
                    <UsedFiltersSection filtersRow={$usedFilters.unUse}/>
                </div>


                <div className={styles.space}/>

                <DoneBtn
                    title={'Посмотреть 456 предложений'}
                    zIndex={0}
                    visIn={visDone}
                    callback={handleClose}
                />
            </div>

            <Filter/>
        </div>
    )
}

export {FiltersList}

// TODO: FiltersList and Filter - объеденить стили и компоненты!
