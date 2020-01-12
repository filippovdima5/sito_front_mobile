import {createEffect, createEvent, createStore, guard, merge } from "effector";
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
export const setDoneFilter = createEvent();
visFilter.on(setVisFilter, ((state, payload) => ({...state, ...payload})));
visFilter.on(setDoneFilter, (state => ({...state, vis: false})));

export const filters = createStore({
    brands: [],
    categories: [],
    sizes: [],
    colors: [],

    prices: [],
    sales: []
});




export const openedFilter = createStore({
    type: '',
    title: '',
    listData: [],
    rangeData : [],
});
openedFilter.on(visFilter, (state, payload) => {
    if (payload.vis) {
        return {...state, title: payload.title, type: payload.type, listData: filters.getState()[payload.type].list, rangeData: filters.getState()[payload.type].range};
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



export const activeFilters = createStore({
    brands: [],
    categories: [],
    sizes: [],
    colors: [],

    prices: [],
    sales: []
});
export const setFilter = createEvent();
export const setFilterRange = createEvent();
export const clearActiveFilters = createEvent();
export const clearAllActiveFilters = createEvent();
activeFilters.on(setFilter, ((state, payload) => {
    return {
        ...state,
        [payload.type] : (state[payload.type].includes(payload.id) ? state[payload.type].filter(item => (item !== payload.id)) : [...state[payload.type], payload.id])
    }
}));


activeFilters.on(setFilterRange, ((state, {id, index, type}) => {
    const newRange = [];
    newRange[index] = id;
    newRange[!!index ? 0 : 1] = state[type][index ? 0 : 1] ? state[type][index ? 0 : 1] : openedFilter.getState().rangeData[!!index ? 0 : 1].toString();
    return {
        ...state,
        [type] : newRange
    }
}));
activeFilters.on(clearActiveFilters, ((state, {type}) => {
    return {...state, [type] : []}
}));
activeFilters.on(clearAllActiveFilters, () => (activeFilters.defaultState));



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

export const fetchParams = activeFilters.map((state => (
    {sex_id: 1, ...Object.fromEntries(Object.entries(state).filter(([key, arr]) => (arr.length > 0)))}
)));



export const fetchFilters = createEffect({
    handler: async (params) => {
        return await api.products.filters(params);
    }
});
export const loadingFilters = fetchFilters.pending.map(pending => !pending);

guard({
    source: fetchParams,
    filter: loadingFilters,
    target: fetchFilters
});

filters.on(fetchFilters.done, ((state, {params, result}) => (result)));


