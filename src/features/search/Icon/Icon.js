import React from 'react';
import styles from './Icon.module.scss';
import search from "../../../media/img/svg/search.svg";
import {setModSearch} from "../searchStore";

function Icon() {
    const handleSetMod = () => (setModSearch());

    return (
        <div
            onClick={handleSetMod}
            className={styles.Icon}
        >
            <img
                src={search}
                alt={'search'}/>
        </div>
    )
}

export {Icon}