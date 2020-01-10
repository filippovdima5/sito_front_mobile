import React from 'react';
import styles from './DoneBtn.module.scss';

function DoneBtn({visIn, callback, zIndex, title}) {

    const handleCallback = (e) => {
        e.stopPropagation();
        callback()
    };

    return (
        <div style={{zIndex}} className={styles.DoneBtn}>
            <div className={styles.done}>
                {visIn &&
                <button
                    onClick={handleCallback}
                    className={styles.btn}>
                    {title}
                </button>
                }
            </div>
        </div>
    )
}

export {DoneBtn}