import React, {Fragment} from 'react';
import styles from './ItemsList.module.scss';
import {listData} from "../../filterListStore";
import {useStore} from "effector-react";


import {Item} from "./Item/Item";

function ItemsList({ type}) {

    const $listData = useStore(listData);



    return (
        <Fragment>
            {$listData.length > 0 &&
            <div className={styles.ItemsList}>
                {$listData.map(({id, title, count, disabled}) => (
                    <Item
                        id = {id}
                        title = { title }
                        count = { count }
                        disabled = { disabled }
                        type = { type}
                        key = {id}
                    />
                ))}
            </div>
            }
        </Fragment>
    )
}

export {ItemsList}