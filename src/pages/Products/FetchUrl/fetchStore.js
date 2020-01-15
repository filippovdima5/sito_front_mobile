import {fetchFiltersParams} from "../../../components/Products/FiltersList/filterListStore";
import {fetchProductsParams} from "../../../components/Products/productsStore";
import {combine} from "effector";

export const params = combine(
    fetchFiltersParams,
    fetchProductsParams,
    (fetchFiltersParams, fetchProductsParams) => ({
        ...fetchFiltersParams, ...fetchProductsParams
    })
);



// params.watch(state => {console.log(state)});

