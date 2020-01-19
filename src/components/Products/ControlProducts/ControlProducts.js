import React  from 'react';
import styles from './ControlProducts.module.scss';
import {setVisFiltersList} from "../FiltersList/filterListStore";
import {SetSort} from "./SetSort/SetSort";



function ControlProducts() {
    return (
        <div className={styles.ControlProducts}>
            <div className={styles.wrap}>
                <SetSort/>

                <button
                    onClick={() => (setVisFiltersList(true))}
                    className={styles.btn}
                >
                    Фильтры
                </button>

            </div>
        </div>
    )
}

export {ControlProducts}