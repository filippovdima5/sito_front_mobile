import React from 'react';
import styles from './searchStyles.module.scss';
import {SearchIcon} from "./SearchIcon/SearchIcon";
import {SearchInput} from "./SearchInput/SearchInput";
import {SearchModalAnimate} from "./SearchModal/SearchMoodalAnimate/SearchModalAnimate";

import {modSearch} from "./searchStore";
import {useStore} from 'effector-react';


function Search() {
    const $modSearch = useStore(modSearch);

    return (
        <div
            className={`${styles.search} ${styles.header_item} ${$modSearch ? styles.search_active : styles.search_close}`}
        >
            <SearchIcon/>
            <SearchInput/>
            <SearchModalAnimate/>
        </div>

    )
}

export {Search}