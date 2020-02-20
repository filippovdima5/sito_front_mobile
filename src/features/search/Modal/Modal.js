import React, {useEffect, useRef} from 'react';
import styles from './Modal.module.scss';
import {Link} from "react-router-dom";
import {useStore} from "effector-react";
import {results} from "../searchStore";
import {clearAllBodyScrollLocks, disableBodyScroll} from "body-scroll-lock";


const mapFacetName = {
    brands: 'Бренды:',
    categories: 'Категории:'
};

function Modal() {
    const modalSearchRef = useRef(null);
    const $results = useStore(results);

    useEffect(() => {
        disableBodyScroll(modalSearchRef.current);
        return (() => {
            clearAllBodyScrollLocks()
        })
    }, []);

    return (
        <div
            ref = {modalSearchRef}
            className={styles.Modal}
        >
            <div   className={styles.modal_body}>
                {$results.map( ([key, arr]) => (
                    <ul key={key} className={styles.result_dropdown_list}>
                        <p className={styles.facet}>{mapFacetName[key]}</p>
                        {arr.map(({title, count, url}) => (
                            <li key={title}>
                                <Link to={url} className={styles.result_dropdown_link}>
                                    {title}
                                    <span className={styles.result_dropdown_count}>{count}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}

            </div>
        </div>
    )
}



export {Modal}