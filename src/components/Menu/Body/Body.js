import React from 'react';
import styles from './Body.module.scss';
import arrowRight from '../../../media/img/svg/rightArrow.svg';
import {Footer} from "./Footer/Footer";
import {showMenuWindow} from "../menuStore";
import {Link} from "react-router-dom";
import {sexDetected} from "../../../helpers/functions/sexDetected";



const catalogList = [
    {title: 'Одежда', index: 'clothes'},
    {title: 'Обувь', index: 'shoes'},
    {title: 'Аксессуары', index: 'accessories'}
];

const mainList = [
    {title: 'Бренды', index: 'brands', link: () => ('/brands')},
    {title: 'Избранное', index: 'favorite', link: (sexId) => (`/products/${sexDetected(sexId)}?favorite=1`)},
    {title: 'Товары дня', index: 'top', link: ((sexId )=> (`/products/${sexDetected(sexId)}?top=1`))}
];

const lastList = [
    {title: 'О нас', index: 'about', link: () => (`/about`)},
];


function Body({sexId}) {
    return (
        <nav className={styles.Body}>
                {
                    !!sexId ?
                        <h2 className={styles.h2}>{sexId === 1 ? 'Для него' : 'Для неё'}</h2>
                        :
                        <div>Выберите пол (кнопка)</div>
                }


                <ul className={styles.ul}>
                    {catalogList.map(({title, index}) => (
                        <Link
                            to={`/products/${sexDetected(sexId)}/${index}`}
                            key={index}
                            className={styles.li}
                        >
                        <span className={styles.link}>
                            {title}
                            <img className={styles.img} src={arrowRight} alt={'go'}/>
                        </span>
                        </Link>
                    ))}
                </ul>


                <ul className={styles.ul}>
                    {mainList.map(({index, title, link}) => (
                        <Link
                            to={link(sexId)}
                            onClick={() => showMenuWindow()}
                            key={index}
                            className={styles.li}>
                        <span className={styles.link}>
                            {title}
                            <img className={styles.img} src={arrowRight} alt={'go'}/>
                        </span>
                        </Link>
                    ))}
                </ul>

                <ul className={styles.ul}>
                    {lastList.map(({index, title, link}) => (
                        <Link
                            to={link(sexId)}
                            onClick={() => showMenuWindow()}
                            key={index}
                            className={styles.li}>
                        <span className={styles.link}>
                            {title}
                            <img className={styles.img} src={arrowRight} alt={'go'}/>
                        </span>
                        </Link>
                    ))}
                </ul>

            <div className={styles.space}/>
            <Footer/>
        </nav>
    )
}

export {Body}