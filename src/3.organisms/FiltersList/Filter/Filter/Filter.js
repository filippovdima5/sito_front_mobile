import React from 'react';
import styles from './Filter.module.scss';
import {setVisFilter} from "../../filtersListStore";
import {Title} from "../../FiltersList/views/Title";


function Filter() {
    return (
        <div
            onClick={() => (setVisFilter(false))}
            className={styles.Filter}>

            <Title/>

        </div>
    )
}

export {Filter}