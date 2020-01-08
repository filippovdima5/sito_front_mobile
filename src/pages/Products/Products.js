import React, {Fragment, useEffect}  from 'react';
import styles from './Products.module.scss';
import { fetchFilters, setVisFiltersList} from "../../components/Products/FiltersList/filterListStore";


import {Skeleton} from "../../1.atoms/Skeleton/Skeleton";
import {FiltersList} from "../../components/Products/FiltersList/animate/FiltersListAnimate";


const data = [];
for (let i = 0; i < 20; i++){
    data.push(i)
}


function Products() {
   useEffect(() => {fetchFilters({})}, []);

    return (
        <Fragment>
            <div className={styles.Products}>

                <div className={styles.controlProducts}>
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




                <div className={styles.productsList}>
                    {data.map(item => (
                        <div
                            key={item}
                            className={styles.productWrap_skeleton}
                        >
                            <div>
                                <div className={styles.wrapImg}>
                                <span className={styles.span}>
                                    <Skeleton customStyle={{paddingBottom: 'calc(125% + 30px)'}}/>
                                </span>
                                </div>
                                <div className={styles.footer}>
                                    <div className={styles.brand}>
                                        <Skeleton customStyle={{height: 14}}/>
                                    </div>
                                    <div className={styles.title}>
                                        <Skeleton customStyle={{height: 14}}/>
                                    </div>
                                    <div className={styles.cost}>
                                        <del className={styles.old_price}>
                                            <Skeleton customStyle={{height: 14, width: 40}}/>
                                        </del>
                                        <span className={styles.price}>
                                        <Skeleton customStyle={{height: 14, width: 40}}/>
                                    </span>
                                    </div>
                                    <div className={styles.sale}>
                                        <Skeleton customStyle={{height: 14}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>






                <div className={styles.loadMore}>
                    <span className={styles.text}>Вы просмотрели 555 товаров из 7798</span>

                    <button
                        className={styles.btn}>
                        Загрузить еще
                    </button>
                </div>
            </div>

            <FiltersList/>
        </Fragment>
    )
}

export {Products}