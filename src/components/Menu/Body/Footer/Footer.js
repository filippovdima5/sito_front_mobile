import React from 'react';
import styles from './Footer.module.scss';
import t from '../../../../media/img/svg/telegram.png';
import i from '../../../../media/img/svg/instagram.svg';
import v from '../../../../media/img/svg/vk.svg';
import y from '../../../../media/img/svg/youtube.svg';


function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.wrap}>
                <div className={styles.social}>
                    <a className={styles.soc} target={'_blank'} href={'/'} rel = {'noopener noreferrer'}>
                        <img className={styles.img} src={t} alt={'d'}/>
                    </a>
                    <a className={styles.soc} target={'_blank'} href={'/'} rel = {'noopener noreferrer'}>
                        <img className={styles.img} src={i} alt={'d'}/>
                    </a>
                    <a className={styles.soc} target={'_blank'} href={'/'} rel = {'noopener noreferrer'}>
                        <img className={styles.img} src={v} alt={'d'}/>
                    </a>
                    <a className={styles.soc} target={'_blank'} href={'/'} rel = {'noopener noreferrer'}>
                        <img className={styles.img} src={y} alt={'d'}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export {Footer}