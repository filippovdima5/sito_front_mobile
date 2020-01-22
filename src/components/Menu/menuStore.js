import {createEvent, createStore} from "effector";

export const $isShowMenu = createStore(false);
export const showMenuWindow = createEvent();
$isShowMenu.on(showMenuWindow, state => (!state));

export const $nextMenuState = createStore({opened: false, index: null, title: null});
export const openNextMenu = createEvent();
export const closeNextMenu = createEvent();
$nextMenuState.on(openNextMenu, ((state, {index, title}) => ({opened: true, index, title})));
$nextMenuState.on(closeNextMenu, (state => ({...state, opened: false})));

$isShowMenu.watch(state => {
    console.log(state);})