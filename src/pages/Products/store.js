import { combine, createEffect, createEvent, createStore, guard } from "effector";
import {sexDetected} from "../../helpers/functions/sexDetected";
import {objCompareJson} from "../../helpers/functions/objСompareJson";
import {shiftHistoryEffector} from "../../helpers/components/shift-history-in-store";
import {userInfo} from "../../stores/user";
import {api} from "../../api";


// First mount Products -> parse URL -> set to all Products states -> fetches
export const sharedStateForProducts = createStore({});
export const hookFirstUrl = createEvent();
sharedStateForProducts.on(hookFirstUrl, (state, payload) => (payload));
// ------------------------------------------------------------------


// States of Products -> working in components of Products -> back up in this store
const mainState = createStore({
    sex_id: 0,
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    prices: [],
    sales: [],
    sort: '',
    page: null
});

mainState.on(sharedStateForProducts, ((state, payload) => {
    if (objCompareJson(state, {...state, ...payload})) return undefined;
    else return {...state, ...payload}
}));

export const sex_id = mainState.map(({sex_id}) => ({sex_id: sex_id}));
sex_id.on(userInfo, (state, payload) => (payload)); // If the USER changes SEX_ID

export const filtersState = mainState
    .map(({
        categories,
        brands,
        sizes,
        colors,
        prices,
        sales,
    }) => ({categories, brands, sizes, colors, prices, sales}));
export const productsState = mainState.map(({sort, page}) => ({sort, page}));
// ------------------


// Clearing states of Products:
const clearFiltersState = filtersState.map((state) => (
    Object.fromEntries(
        Object.entries(state).filter(([_, value]) => (value.length > 0))
    )
));
const clearProductsState = productsState.map(state => (
    Object.fromEntries(
        Object.entries(state).filter(([_, value]) => (!!value))
    )
));
//----------------------------


// Params for fetching:
const filtersFetchParams = combine(sex_id, clearFiltersState, (a, b) => ({...a, ...b}));
const productsFetchParams = combine(filtersFetchParams, clearProductsState, (a, b) => ({...a, ...b}));
//--------------------


// PUSH or REPLACE:
productsFetchParams.watch(({sex_id, ...params}) => {
    shiftHistoryEffector.getState() && shiftHistoryEffector.getState().replace( `/products/${sexDetected(sex_id)}`, params)
});
// ----------------------------


// Store of Product:
export const productsStore = createStore([]);
export const filtersStore = createStore({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    prices: [],
    sales: [],
});
//-----------------


// Fetching:
export const fetchFilters = createEffect({
    handler: async (params) => {
        return await api.products.filters(params);
    }
});
const loadingFilters = fetchFilters.pending.map(pending => !pending);
filtersStore.on(fetchFilters.done, ((state, {result}) => result));
guard({
    source: filtersFetchParams,
    filter: loadingFilters,
    target: fetchFilters
});


export const fetchProducts = createEffect({
    handler: async (params) => {
        return await api.products.getProducts(params);
    }
});
export const loadingProducts = fetchProducts.pending.map(pending => !pending);
productsStore.on(fetchProducts.done, (state, {result: {products}}) => (products));
guard({
    source: productsFetchParams,
    filter: loadingProducts,
    target: fetchProducts
});
//----------





// logs:
//const log = 'Products';
//mainState.watch(state => {console.log(state, `${log}-mainState`)});
//-----
