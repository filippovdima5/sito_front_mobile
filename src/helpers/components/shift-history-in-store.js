import React, {useEffect, useRef} from 'react';
import {useShiftHistory} from "../wrappers/rout_history_shift";
import {createEvent, createStore} from "effector";

export const shiftHistoryEffector = createStore(null);
const hookShiftHistoryObject = createEvent();
shiftHistoryEffector.on(hookShiftHistoryObject, (state, payload) => (payload));

const ShiftHistoryInStore = React.memo(function ShiftHistoryInStore() {
    const shiftHistory = useShiftHistory();
    const shiftHistoryRef = useRef(shiftHistory);
    useEffect(() => {hookShiftHistoryObject(shiftHistoryRef.current)}, [])
});

export {ShiftHistoryInStore}