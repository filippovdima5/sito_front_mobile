import React  from 'react';
import animate from './animate.module.scss';
import {useTransitionNames} from "../../../../hooks/useTransitionNames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {visFiltersList} from "../../filtersListStore";
import {useStore} from "effector-react";
import {FiltersList} from "../index";

function FiltersListAnimate() {
    const $visFiltersList = useStore(visFiltersList);
    const classNames = useTransitionNames(animate);

    // useEffect(() => {
    //     if ($visFiltersList) {
    //         document.body.style.height = '';
    //     }
    //     else  {
    //         document.body.style.height = '100% !important';
    //     }
    // }, [$visFiltersList]);

    return (
        <TransitionGroup
            style = {{position: 'absolute'}}
        >
            {$visFiltersList &&
            <CSSTransition
                in = {$visFiltersList}
                timeout = {200}
                classNames = {classNames}
            >
                <FiltersList/>
            </CSSTransition>
            }
        </TransitionGroup>
    )
}

export {FiltersListAnimate}