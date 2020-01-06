import {modFetch} from "./helpers/modFetch";

const api = {
    search : {
        mainSearch: (body) => modFetch('/api/search/mainSearch', body)
    },

    products: {
        filters: (body) => modFetch('/api/products/filters', body),
        getProducts: (body) => modFetch('/api/products/getProducts', body)
    }


};

export {api}