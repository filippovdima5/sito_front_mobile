import {createEvent, createStore} from "effector";


export const modSearch = createStore(false);
export const setModSearch = createEvent();
modSearch.on(setModSearch, (state => (!state)));