import { createStore, createEvent, restore } from 'lib/effector'
import { categories } from './constants'


export const $showMainMenu  = createStore<boolean>(false)
export const $setShowMainMenu =  createEvent()
$showMainMenu.on($setShowMainMenu, (state => !state))


export const $setShowNextMenu = createEvent<keyof typeof categories[0 | 1 | 2] | null>()
export const $showNextMenu = restore($setShowNextMenu, null)




