import {createEvent, createStore} from 'effector'

export const $countHelpsHint = createStore<number>(0)
export const setContHelpHint = createEvent()
$countHelpsHint.on(setContHelpHint, state => state + 1)

