import {createEvent, createStore} from "effector";

export const $isShowMenu = createStore(false);
export const showMenuWindow = createEvent();
$isShowMenu.on(showMenuWindow, state => (!state));