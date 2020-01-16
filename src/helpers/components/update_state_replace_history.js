import React, {Fragment, useEffect, useRef} from 'react'
import {useUpdateEffect} from "react-use";
import {useShiftHistory} from "../wrappers/rout_history_shift";
import {useLocation} from "react-use";
import {fetchFiltersParams} from "../../components/Products/FiltersList/filterListStore";
import {useStore} from "effector-react";


const UpdateStateReplaceHistory = React.memo(function UpdateStateReplaceHistory() {
    const {replace} = useShiftHistory();
    const $filtersParams = useStore(fetchFiltersParams);
    const {pathname} = useLocation();
    const pathnameRef = useRef(pathname);
    useEffect(() => {pathnameRef.current = pathname}, [pathname]);



    useUpdateEffect(()=>{
        console.log($filtersParams)
        replace(pathnameRef.current, $filtersParams)
    }, [$filtersParams])
});

export {UpdateStateReplaceHistory}