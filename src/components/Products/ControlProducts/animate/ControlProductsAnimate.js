import React, {useState, useEffect, useRef} from 'react';
import {useScroll} from "react-use";
import animate from './animate.module.scss';
import {ControlProducts} from "../ControlProducts";
import {CSSTransition } from 'react-transition-group';
import {useTransitionNames} from "../../../../helpers/hooks/useTransitionNames";


function ControlProductsAnimate() {
    const classNames = useTransitionNames(animate);
    const [show, setShow] = useState(false);
    const bodyRef = useRef(document.body);
    const prevPosY = useRef(0);
    const curPosY = useScroll(bodyRef).y;
    useEffect(() => {
        if (curPosY < prevPosY.current && !show && curPosY > 100) setShow(true);
        if ((curPosY > prevPosY.current && show) || curPosY === 0) setShow(false);
        prevPosY.current = curPosY;
    }, [curPosY, show]);


    return (
        <CSSTransition
            in = {show}
            timeout = {300}
            classNames = {classNames}
        >
            <ControlProducts/>
        </CSSTransition>
    )
}

export {ControlProductsAnimate as ControlProducts}