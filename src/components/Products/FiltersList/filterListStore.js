import {createEffect, createEvent, createStore} from "effector";
import {api} from "../../../api";
import {maxItemsInFilter} from "./Filter/Filter";


export const visFiltersList = createStore(false);
export const setVisFiltersList = createEvent();
visFiltersList.on(setVisFiltersList, ((state, payload) => (payload)));


export const visFilter = createStore({
    vis: false,
    type: '',
    title: '',
});
export const setVisFilter = createEvent();
visFilter.on(setVisFilter, ((state, payload) => ({...state, ...payload})));


export const filters = createStore({
    brands: [],
    categories: [],
    sizes: [],
    colors: [],
});

// const mapTitleFilters = filters.map((state, lastState) => ({
//
// }));

export const openedFilter = createStore({
    type: '',
    title: '',
    listData: []
});
openedFilter.on(visFilter, (state, payload) => {
    if (payload.vis) {
        return {...state, title: payload.title, type: payload.type, listData: filters.getState()[payload.type]};
    }
    else {return {...state}}
});

export const listData = openedFilter.map((({listData}) => {
    if (listData.length > maxItemsInFilter) return listData.slice(0, maxItemsInFilter);
    else return listData
}));

listData.watch(state => {console.log(state)})


//filters.watch(state => {console.log(state)});

export const activeFilters = createStore({
    brands: [],
    categories: [],
    sizes: [],
    colors: []
});
export const setFilter = createEvent();
export const clearActiveFilters = createEvent();
export const clearAllActiveFilters = createEvent();
activeFilters.on(setFilter, ((state, payload) => {
    return {
        ...state,
        [payload.type] : (state[payload.type].includes(payload.id) ? state[payload.type].filter(item => (item !== payload.id)) : [...state[payload.type], payload.id])
    }
}));
activeFilters.on(clearActiveFilters, ((state, payload) => {
    return {...state, [payload.type] : []}
}));
activeFilters.on(clearAllActiveFilters, () => (activeFilters.defaultState));

// activeFilters.watch(state => {console.log(state)});

export const usedFilters = activeFilters.map(state => (
    {
        use: Object.entries(state)
            .filter(([key, arr]) => (arr.length > 0))
            .map(([key, arr]) => (key)),
        unUse: Object.entries(state)
            .filter(([key, arr]) => (arr.length === 0))
            .map(([key, arr]) => (key))
    }
));

//usedFilters.watch(state => {console.log(state)})


export const fetchFilters = createEffect({
    handler: async (params) => {
        return await api.products.filters(params);
    }
});
filters.on(fetchFilters.done, ((state, {params, result}) => (result)));


