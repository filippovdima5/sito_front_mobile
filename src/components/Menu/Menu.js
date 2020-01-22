import React from 'react';
import styles from './styles/Menu.module.scss';
import {Header} from "./Header/Header";
import {Body} from "./Body/Body";
import {$sexId} from "../../stores/user";
import {useStore} from "effector-react";

import {NextMenu} from "./NextMenu/NextMenu";

function Menu() {
    const sexId = useStore($sexId);

    return (
        <div>
            <div className={styles.Menu}>
                <Header sexId={sexId}/>
                <Body sexId={sexId}/>
            </div>
            <NextMenu/>
        </div>
    )
}

export {Menu}