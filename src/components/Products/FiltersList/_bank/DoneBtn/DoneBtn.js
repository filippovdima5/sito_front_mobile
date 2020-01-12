import React, {Fragment} from 'react';
import styles from './DoneBtn.module.scss';
import {Loader1} from "../../../../../1.atoms/loaders/Loader1/Loader1";

function DoneBtn({visIn, callback, zIndex, title, loading = false}) {

    const handleCallback = (e) => {
        e.stopPropagation();
        callback()
    };

    return (
        <div style={{zIndex}} className={styles.DoneBtn}>
            <div className={styles.done}>

                {visIn &&
                    <Fragment>
                        {loading && <Loader1 style={{transform: 'translate(-50%, 30%)'}}/>}
                        <button
                            disabled={loading}

                            onClick={handleCallback}
                            className={`${styles.btn} ${loading && styles.btn_disabled}`}>
                            {title}
                        </button>
                    </Fragment>
                }
            </div>
        </div>
    )
}

export {DoneBtn}

// TODO: 1. Анимация. Плавное появление лоадера, плавное изменение фона кнопки
// TODO: 2. Лоадер нкжен только в одном месте, возможно разделить компоненты