import React, { useState } from 'react';
import {useUpdateEffect} from "../../../../helpers/hooks/useUpdateEffect";
import styles from './Filter.module.scss';
import { setDoneFilter, clearActiveFilters, setShowAllItems  } from "../filterListStore";
import { activeFilters, openedFilter, visLoadMore } from "../filterListStore";
import {useStore} from "effector-react";

import { Header } from "../_bank/Header/Header";
import { Search } from "./Search/Search";
import { ItemsList } from "./ItemsList/ItemsList";
import { RangeInputs } from "./RangeInputs/RangeInputs";
import { ButtonMore } from "../../_bank/Button/ButtonMore";
import { DoneBtn } from "../_bank/DoneBtn/DoneBtn";


export const maxItemsInFilter = 3;


function Filter() {
    const {listData, type, title, rangeData} = useStore(openedFilter);
    const $activeFilters = useStore(activeFilters)[type];
    const $visLoadMore = useStore(visLoadMore);

    const [visDone, setVisDone] = useState(false);
    useUpdateEffect(() => {setVisDone(true)}, [$activeFilters]);




    return (
        <div className={styles.Filter}>

            <Header title={title} prev={setDoneFilter}/>

            <div className={styles.filterBody}>

                {listData.length > maxItemsInFilter && <Search/>}

                {listData.length > 0 && <ItemsList type={type} listData={listData}/>}
                {rangeData.length > 0 && <RangeInputs type={type} range={rangeData}/>}

                {
                    $activeFilters.length > 0 &&
                    <div
                        onClick={() => clearActiveFilters({type})}
                        className={styles.loadMore}>
                        <ButtonMore  title={'Сбросить'}/>
                    </div>
                }

                {
                    ($visLoadMore && listData.length > maxItemsInFilter) &&
                    <div className={styles.loadMore}>
                        <ButtonMore onClick = { () => setShowAllItems() } title={'Показать ещё'}/>
                    </div>
                }


               <div className={styles.space}/>

               <DoneBtn
                   title={ 'Готово' }
                   zIndex={4}
                   visIn={visDone}
                   callback={setDoneFilter}/>

            </div>

        </div>
    )
}




export {Filter}