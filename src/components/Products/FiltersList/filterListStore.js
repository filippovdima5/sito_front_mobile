import {createEffect, createEvent, createStore} from "effector";
import {api} from "../../../api";


export const visFiltersList = createStore(true);
export const setVisFiltersList = createEvent();
visFiltersList.on(setVisFiltersList, ((state, payload) => (payload)));


export const visFilter = createStore(false);
export const setVisFilter = createEvent();
visFilter.on(setVisFilter, ((state, payload) => (payload)));


export const filters = createStore({
    brands: [],
    categories: [],
    sizes: [],
    colors: [],

});

filters.watch(state => {console.log(state)});

const activeFilters = createStore({
    brands: [],
    categories: [],
    sizes: [],
    colors: []
});

activeFilters.watch(state => {console.log(state)});

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

usedFilters.watch(state => {console.log(state)})



export const fetchFilters = createEffect({
    handler: async (params) => {
        return await api.products.filters(params);
    }
});
filters.on(fetchFilters.done, ((state, {params, result}) => (result)));


