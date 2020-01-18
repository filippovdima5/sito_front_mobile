import { createEvent, createStore, merge } from "effector";
import { filtersStore, filtersState } from "../../../pages/Products/store";


import {maxItemsInFilter} from "./Filter/Filter";

// display
export const visFiltersList = createStore(false);
export const setVisFiltersList = createEvent();
visFiltersList.on(setVisFiltersList, ((state, payload) => (payload)));


export const visFilter = createStore({
    vis: false,
    type: '',
    title: '',
});

export const setVisFilter = createEvent();
export const setDoneFilter = createEvent();
visFilter.on(setVisFilter, ((state, payload) => ({...state, ...payload})));
visFilter.on(setDoneFilter, (state => ({...state, vis: false})));
// --------





export const openedFilter = createStore({
    type: '',
    title: '',
    listData: [],
    rangeData : [],
});
openedFilter.on(visFilter, (state, payload) => {
    if (payload.vis) {
        return {...state, title: payload.title, type: payload.type, listData: filtersStore.getState()[payload.type].list, rangeData: filtersStore.getState()[payload.type].range};
    }
    else {return {...state}}
});


const searchPhrase = createStore('');
export const visLoadMore = openedFilter.map(({listData}) => (listData.length > maxItemsInFilter));

export const setSearchPhrase = createEvent();
export const setShowAllItems = createEvent();
searchPhrase.on(setSearchPhrase, (state, payload) => (payload));

const triggerLoadMore = merge([setSearchPhrase, setShowAllItems]);
visLoadMore.on(triggerLoadMore, state => (state ? false : state));



export const listData = openedFilter.map((({listData}) => {
    if ((listData.length > maxItemsInFilter)) return listData.slice(0, maxItemsInFilter);
    else return listData
}));
listData.on(setSearchPhrase, ((state, payload) => (
    openedFilter.getState().listData
        .filter(({title}) => (title.toLowerCase().includes(payload.toLowerCase())))
)));
listData.on(setShowAllItems, () => openedFilter.getState().listData);






export const setFilter = createEvent();
export const setFilterRange = createEvent();
export const clearActiveFilters = createEvent();
export const clearAllActiveFilters = createEvent();



filtersState.on(setFilter, ((state, payload) => {
    return {
        ...state,
        [payload.type] : (state[payload.type].includes(payload.id) ? state[payload.type].filter(item => (item !== payload.id)) : [...state[payload.type], payload.id])
    }
}));

filtersState.on(setFilterRange, ((state, {id, index, type}) => {
    const newRange = [];
    newRange[index] = id;
    newRange[!!index ? 0 : 1] = state[type][index ? 0 : 1] ? state[type][index ? 0 : 1] : openedFilter.getState().rangeData[!!index ? 0 : 1].toString();
    return {
        ...state,
        [type] : newRange
    }
}));
filtersState.on(clearActiveFilters, ((state, {type}) => {
    return {...state, [type] : []}
}));
filtersState.on(clearAllActiveFilters, () => (filtersState.defaultState));


export const usedFilters = filtersState.map(state => (
    {
        use: Object.entries(state)
            .filter(([key, arr]) => (arr.length > 0))
            .map(([key, arr]) => (key)),
        unUse: Object.entries(state)
            .filter(([key, arr]) => (arr.length === 0))
            .map(([key, arr]) => (key))
    }
));
