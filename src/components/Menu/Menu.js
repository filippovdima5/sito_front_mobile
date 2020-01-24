import React, {useEffect, useState} from 'react';
import styles from './Menu.module.scss';
import {Header} from "./Header/Header";
import {Body} from "./Body/Body";
import {$sexId} from "../../stores/user";
import {useStore} from "effector-react";
import {NextMenu} from "./NextMenu/animate/NextMenuAnimate";




function Menu() {
    const sexId = useStore($sexId);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('@/env')) setCategories(JSON.parse(localStorage.getItem('@/env')).categories);
        else {
            fetch('/api/env')
                .then(res => res.json())
                .then(env => {
                    localStorage.setItem('@/env', JSON.stringify(env));
                    setCategories(env.categories)
                })
        }
    }, [sexId]);

    return (
        <div className={styles.Menu}>
            <Header sexId={sexId}/>
            <Body sexId={sexId}/>

            <NextMenu categories = {categories && categories[sexId]}/>
        </div>
    )
}

export {Menu}