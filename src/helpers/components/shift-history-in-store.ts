import React, { useEffect, useRef } from 'react'
import { createEvent, createStore } from 'effector'
import { useShiftHistory } from '../wrappers/rout_history_shift'


export const shiftHistoryEffector = createStore(null)
const hookShiftHistoryObject = createEvent()
shiftHistoryEffector.on(hookShiftHistoryObject, (state, payload) => (payload))

function ShiftHistoryInStore() {
  const shiftHistory = useShiftHistory()
  const shiftHistoryRef = useRef(shiftHistory)
  useEffect(() => {
    //todo: Типизация
    // @ts-ignore
    hookShiftHistoryObject(shiftHistoryRef.current)}, [])

  return null
}

export { ShiftHistoryInStore }