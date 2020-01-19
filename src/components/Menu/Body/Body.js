import React from 'react';
import styles from './Body.module.scss';

function Body({sexId}) {
    return (
        <nav className={styles.Body}>
            {
                !!sexId ?
                    <h2 className={styles.h2}>{sexId === 1 ? 'Для него' : 'Для неё'}</h2>
                    :
                    <div>Выберите пол (кнопка)</div>
            }
            <ul>

            </ul>
        </nav>
    )
}

export {Body}