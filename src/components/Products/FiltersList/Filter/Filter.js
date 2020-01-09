import React from 'react';
import styles from './Filter.module.scss';
import { setVisFilter, visFilter } from "../filterListStore";
import {useStore} from "effector-react";

import { Header } from "../_bank/Header/Header";


import { ButtonMore } from "../../_bank/Button/ButtonMore";


function Filter() {
    const title = useStore(visFilter);

    return (
        <div className={styles.Filter}>

            <Header title={title} prev={() => (setVisFilter(false))}/>

            <div className={styles.filterBody}>
                <div className={styles.search}>
                    <div className={styles.inputWrap}>
                        <input
                            placeholder={'Поиск'}
                            type={'text'}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.itemsList}>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>
                    <label className={styles.item}>
                        <input
                            type={'checkbox'}
                            className={styles.checkbox}
                        />
                        <span className={styles.icon}/>
                        <span className={styles.title}>Klkac</span>
                    </label>

                </div>

                <div className={styles.loadMore}>
                    <ButtonMore  title={'Сбросить'}/>
                </div>

                <div className={styles.loadMore}>
                    <ButtonMore  title={'Показать ещё'}/>
                </div>

                <div className={styles.space}/>

               <div className={styles.wrapDone}>
                   <div className={styles.done}>
                       <button className={styles.btn}>
                           Готово
                       </button>
                   </div>
               </div>

            </div>



        </div>
    )
}

export {Filter}