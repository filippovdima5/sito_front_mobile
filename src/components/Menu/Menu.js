import React from 'react';
import styles from './Menu.module.scss';
import {Header} from "./Header/Header";
import {Body} from "./Body/Body";
import {$sexId} from "../../stores/user";
import {useStore} from "effector-react";

function Menu() {
    const sexId = useStore($sexId);

    return (
        <div className={styles.Menu}>
            <Header sexId={sexId}/>
            <Body sexId={sexId}/>
        </div>
    )
}

export {Menu}