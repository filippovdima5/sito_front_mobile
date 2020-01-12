import React, {useRef} from 'react';
import styles from './ControlProducts.module.scss';
import {setVisFiltersList} from "../FiltersList/filterListStore";
import {useScroll} from "react-use";

function ControlProducts() {
    const bodyRef = useRef(document.body);
    const {y} = useScroll(bodyRef)
    console.log(y)


    return (
        <div className={styles.ControlProducts}>
            <div className={styles.wrap}>
                <div className={styles.select}>
                    <select
                        className={styles.select_main}>
                        <option>По новизне</option>
                        <option>По цене</option>
                        <option>По размеру скидики</option>
                    </select>
                </div>


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