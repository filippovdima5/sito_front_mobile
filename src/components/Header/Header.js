import React  from 'react';
import styles from './Header.module.scss';
import { Search} from "./Search/Search";

function Header() {



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

            <Search/>
        </div>
    )
}

export {Header}