import {createEffect, createEvent, createStore} from "effector";
import {api} from "../../../api";


export const modSearch = createStore(false);
export const setModSearch = createEvent();
modSearch.on(setModSearch, (state => (!state)));


export const results = createStore([]);
export const fetchResults = createEffect({
    handler: async (params) => {
        return await api.search.mainSearch(params)
    }
});
results.on(fetchResults.done, ((state, {params, result}) => ( Object.entries(result[0]).filter(([key, value]) => (!!value.length)) )))


//results.watch(state => console.log(state))