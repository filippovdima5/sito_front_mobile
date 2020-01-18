import { createStore} from "effector";
import { fetchProducts} from "../../pages/Products/store";


export const productsCountsStore = createStore({
    total: 0,
    totalPage: 1
});


productsCountsStore.on(fetchProducts.done, ((state, {result: {info: [{total, totalPages}]}}) => ({total, totalPages})));



productsCountsStore.watch(state => {
    console.log(state);})