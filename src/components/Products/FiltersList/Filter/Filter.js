import React, { useState } from 'react';
import {useUpdateEffect} from "../../../../hooks/useUpdateEffect";
import styles from './Filter.module.scss';
import { setVisFilter, visFilter,  activeFilters, clearActiveFilters, openedFilter} from "../filterListStore";
import {useStore} from "effector-react";

import { Header } from "../_bank/Header/Header";
import { Search } from "./Search/Search";
import { ItemsList } from "./ItemsList/ItemsList";
import { ButtonMore } from "../../_bank/Button/ButtonMore";
import { DoneBtn } from "../_bank/DoneBtn/DoneBtn";

export const maxItemsInFilter = 10;


function Filter() {
    const {title, type} = useStore(visFilter);
    const {listData} = useStore(openedFilter);
    const $activeFilters = useStore(activeFilters)[type];

    const [visDone, setVisDone] = useState(false);
    useUpdateEffect(() => {setVisDone(true)}, [$activeFilters]);

    const handleClose = () => (setVisFilter({vis: false}));



    return (
        <div className={styles.Filter}>

            <Header title={title} prev={handleClose}/>

            <div className={styles.filterBody}>

                {listData.length > maxItemsInFilter && <Search/>}

                <ItemsList type={type} listData={listData}/>

                {
                    $activeFilters.length > 0 &&
                    <div
                        onClick={() => clearActiveFilters({type})}
                        className={styles.loadMore}>
                        <ButtonMore  title={'Сбросить'}/>
                    </div>
                }

                {
                    listData.length > maxItemsInFilter &&
                    <div className={styles.loadMore}>
                        <ButtonMore  title={'Показать ещё'}/>
                    </div>
                }


               <div className={styles.space}/>

               <DoneBtn
                   title={ 'Готово' }
                   zIndex={4}
                   visIn={visDone}
                   callback={handleClose}/>

            </div>

        </div>
    )
}




export {Filter}