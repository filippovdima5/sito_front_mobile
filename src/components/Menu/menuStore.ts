import { createEvent, createStore } from 'effector'
import { NextMenuState } from './types';


export const $isShowMenu = createStore(false)
export const showMenuWindow = createEvent()
$isShowMenu.on(showMenuWindow, state => (!state))

export const $nextMenuState = createStore<NextMenuState>({ opened: false, index: null, title: null })
export const openNextMenu = createEvent<{index: number, title: string}>()
export const closeNextMenu = createEvent()
$nextMenuState.on(openNextMenu, ((state, { index, title }) => ({ opened: true, index, title })))
$nextMenuState.on(closeNextMenu, (state => ({ ...state, opened: false })))
$nextMenuState.on($isShowMenu, (state, payload) => {if (!payload) return ({ ...state, opened: false })})