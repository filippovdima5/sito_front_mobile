import { createStore, createEvent, restore } from 'lib/effector'


export const $showMainMenu  = createStore<boolean>(false)
export const $setShowMainMenu =  createEvent()
$showMainMenu.on($setShowMainMenu, (state => !state))


export const $setShowNextMenu = createEvent<{ index: string, title: string } | null>()
export const $showNextMenu = restore($setShowNextMenu, null)




