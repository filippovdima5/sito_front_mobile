import React, {useCallback} from 'react';
import styles from './FiltersList.module.scss';
import {setVisFiltersList} from "./filterListStore";

import {Header} from "./_bank/Header/Header";

const handleClose = () => (setVisFiltersList(false));

function FiltersList() {
    return (
        <div className={styles.FiltersList}>

            <Header title={'Фильтры'} close={handleClose}/>

            <div className={styles.wrap}>
                <div className={styles.scroll}>


                    <section className={`${styles.section} ${styles.active_filters}`}>

                        <h3 className={styles.h3}>Используются сейчас</h3>

                        <div className={styles.filters}>


                            <button
                                className={styles.skip_all}
                            >
                                Сбросить всё
                            </button>


                            <div className={styles.list}>

                                <div
                                    //onClick={() => (setVisFilter(true))}
                                    className={styles.filter_item}>

                                    <div className={styles.item_wrap}>
                                        <div className={styles.item}>
                                            <div className={styles.item_text_wrap}>
                                                <div className={styles.title_filter_wrap}>
                                                    <div className={styles.title_filter}>Бренды</div>
                                                </div>

                                                <div className={styles.active_filters_wrap}>
                                                    <div className={styles.active_filters}>Адидас, хуедас, kmednkek, kdlwnfw, erklnfejl, jrnwlj , whjerrrrrrrrhh</div>
                                                </div>
                                            </div>

                                            <div className={styles.item_arrow_wrap}>
                                                <svg>
                                                    <path fillRule="evenodd" d="M10.007 4.003L18.004 12l-7.997 7.997-1.414-1.414L15.176 12 8.593 5.417z"/>
                                                </svg>
                                            </div>

                                        </div>
                                    </div>

                                    <button
                                        className={styles.skip_one}
                                    >
                                        Сбросить
                                    </button>
                                </div>


                            </div>
                        </div>
                    </section>



                        <section className={styles.section}>

                            <h3 className={styles.h3}>Остальные</h3>

                            <div className={styles.filters}>

                                <div className={styles.list}>

                                    <div
                                        //onClick={() => (setVisFilter(true))}
                                        className={styles.filter_item}>

                                        <div className={styles.item_wrap}>
                                            <div className={styles.item}>
                                                <div className={styles.item_text_wrap}>
                                                    <div className={styles.title_filter_wrap}>
                                                        <div className={styles.title_filter}>Бренды</div>
                                                    </div>

                                                    <div className={styles.active_filters_wrap}>
                                                        <div className={styles.active_filters}>Адидас, хуедас, kmednkek, kdlwnfw, erklnfejl, jrnwlj , whjerrrrrrrrhh</div>
                                                    </div>
                                                </div>

                                                <div className={styles.item_arrow_wrap}>
                                                    <svg>
                                                        <path fillRule="evenodd" d="M10.007 4.003L18.004 12l-7.997 7.997-1.414-1.414L15.176 12 8.593 5.417z"/>
                                                    </svg>
                                                </div>

                                            </div>
                                        </div>

                                        <button
                                            className={styles.skip_one}
                                        >
                                            Сбросить
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </section>



                </div>
            </div>

        </div>
    )
}

export {FiltersList}
