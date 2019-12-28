import React, {useState} from 'react';
import styles from './Header.module.scss';
import search from './search.svg';

function Header() {
    const [modSearch, setModSearch] = useState(false);


    return (
        <div className={styles.Header}>
            <div className={`${styles.menu_button} ${styles.header_item}`}>
                <input
                    id = 'checkbox3'
                    type="checkbox"
                    className={`${styles.checkbox3} ${styles.visuallyHidden}`}
                />
                <label htmlFor="checkbox3">
                    <div className={`${styles.hamburger} ${styles.hamburger3}`}>
                        <span className={`${styles.bar} ${styles.bar1}`}/>
                        <span className={`${styles.bar} ${styles.bar2}`}/>
                        <span className={`${styles.bar} ${styles.bar3}`}/>
                        <span className={`${styles.bar} ${styles.bar4}`}/>
                    </div>
                </label>
            </div>

            <div className={`${styles.logo} ${styles.header_item}`}>
                <span className={styles.a}>
                    <span className={styles.text}>Sito</span>
                </span>
            </div>

            <div
                //onClick={() => {console.log('kdm')}}
                className={`${styles.search} ${styles.header_item} ${modSearch ? styles.search_active : styles.search_close}`}>

                <div className={styles.Search}>
                    <div
                        onClick={() => {setModSearch(!modSearch)}}
                        className={styles.img}
                    >
                        <img
                            src={search}
                            alt={'search'}/>
                    </div>

                    <input
                        placeholder={'Поиск по ключевому слову'}
                        className={styles.input}
                        type={'text'}
                    />

                    {modSearch && <div className={styles.modal}/>}

                </div>

            </div>

        </div>
    )
}

export {Header}