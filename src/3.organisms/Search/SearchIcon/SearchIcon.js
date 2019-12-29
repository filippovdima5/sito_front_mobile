import React from 'react';
import styles from '../searchStyles.module.scss';
import search from "./search.svg";
import {setModSearch} from "../searchStore";

const SearchIcon = React.memo(() => {
    const handleSetMod = () => (setModSearch());

    return(
        <div
            onClick={handleSetMod}
            className={styles.img}
        >
            <img
                src={search}
                alt={'search'}/>
        </div>
    )
});

export {SearchIcon}