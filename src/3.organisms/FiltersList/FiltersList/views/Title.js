import React from 'react'
import styles from '../../filtersListStyles.module.scss';
import {setVisFiltersList} from "../../filtersListStore";

function Title({title, close = false}) {
    return (
        <div className={styles.title}>
            <div className={styles.title_wrap}>



                <div className={styles.text_wrap}>
                    <div className={styles.text}>{title}</div>
                </div>



                {
                    close &&
                    <div className={styles.btn_wrap}>
                        <button
                            onClick={() => (setVisFiltersList(false))}
                            className={styles.btn}>
                            <svg viewBox = {'0 0 24 24'} className={styles.svg}>
                                <path d = {'M18.997 6.417l-1.414-1.414L12 10.586 6.417 5.003 5.003 6.417 10.586 12l-5.583 5.583 1.414 1.414L12 13.414l5.583 5.583 1.414-1.414L13.414 12z'}/>
                            </svg>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export {Title}