import React from 'react';
import styles from './Skeleton.module.scss';

function Skeleton({style, customStyle}) {
    return (<div
        {...!!customStyle && {style: customStyle}}
        className={`${styles.Skeleton} ${!!style && style}`}/>)
}

export {Skeleton}