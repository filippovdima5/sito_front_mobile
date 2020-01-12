import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import styles from './FilterRow.module.scss';
import {setVisFilter, activeFilters, clearActiveFilters} from "../../filterListStore";
import rightArrowSVG from "../../../../../img/svg/rightArrow.svg";
import {useStore} from "effector-react";



function FilterRow({title, typeFilter, isUsed}) {
    const $activeFilters = useStore(activeFilters)[typeFilter];

    const activeFiltersString = useMemo(() => {
        let string =  $activeFilters.join(' | ');
        string = string.length > 37 ? string.substr(0, 34) + '...' : string;
        return string
    }, [$activeFilters]);


    const rowRef = useRef(null);
    const skipRowRef = useRef(null);
    const xPosition = useRef(0);
    const [skipLength, setSkip] = useState(0);
    const [skipStyle, setSkipStyle] = useState('');

    const handleTouchStart = useCallback((e) => {
        xPosition.current = e.touches[0].pageX + skipLength;
        setSkipStyle('');
    }, [skipLength]);


    const handleTouchMove = (e) => {
        setSkip(xPosition.current - e.touches[0].pageX)
    };

    const handleTouchEnd = useCallback((e) => {
        const percentSkip = skipLength / rowRef.current.clientWidth;
        setSkipStyle(styles.show_skip);

        if (percentSkip < 0.2) setSkip(0);
        if (percentSkip >= 0.2 && percentSkip <= 0.5) setSkip(0.4 * rowRef.current.clientWidth);
        if (percentSkip > 0.5) setSkip(rowRef.current.clientWidth);
    }, [skipLength]);

    useEffect(() => {
        if (skipLength === rowRef.current.clientWidth) {
            let timer = setTimeout(() => {clearActiveFilters({type: typeFilter})}, 150);
            return () => {clearTimeout(timer)}
        }
    }, [skipLength, typeFilter]);


    return (
        <div ref = { rowRef } className={`${styles.filterRow} ${skipStyle}`}>
            <div
                {...isUsed && {
                    onTouchStart: handleTouchStart,
                    onTouchMove: handleTouchMove,
                    onTouchEnd: handleTouchEnd
                }}
                ref = { skipRowRef }
                onClick={() => (setVisFilter({title, type: typeFilter, vis: true}))}
                style={{left: `-${skipLength}px`}}
                className={styles.item_wrap}
            >

                <div className={styles.item}>
                    <div className={styles.item_text_wrap}>
                        <div className={styles.title_filter_wrap}>
                            <div>{title}</div>
                        </div>

                        <div className={styles.active_filters_wrap}>
                            <div>{activeFiltersString}</div>
                        </div>
                    </div>

                    <div className={styles.item_arrow_wrap}>
                        <img src={rightArrowSVG} alt={'go'} className={styles.svg}/>
                    </div>

                </div>

            </div>

            <button
                onClick={(e) => {clearActiveFilters({type: typeFilter})} }
                style={{width: `${skipLength}px`}}
                className={styles.skip_one}
            >
                Сбросить
            </button>
        </div>
    )
}

export {FilterRow}