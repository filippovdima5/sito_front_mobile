import {createEffect, createStore, guard} from "effector";
import {api} from "../../api";

import {fetchParams} from "./FiltersList/filterListStore";


fetchParams.watch(state => console.log(state))


export const productsStore = createStore([]);
export const productsCountsStore = createStore({});

export const fetchProducts = createEffect({
    handler: async (params) => {
        return await api.products.getProducts(params);
    }
});
export const loadingProducts = fetchProducts.pending.map(pending => !pending);

productsStore.on(fetchProducts.done, ((state, {result: {products}}) => (products)));
productsCountsStore.on(fetchProducts.done, ((state, {result: {info: [{total, totalPages}]}}) => ({total, totalPages})));

guard({
    source: fetchParams,
    filter: loadingProducts,
    target: fetchProducts
});


productsStore.watch(state => console.log(state));
productsCountsStore.watch(state => console.log(state));