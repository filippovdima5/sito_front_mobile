import {modFetch} from "./helpers/modFetch";

const api = {
    env: () => {
        if (localStorage.getItem('@/env2')) return localStorage.getItem('env')
        const env = modFetch('/api/env2');
        localStorage.setItem('@/env2', JSON.stringify(env));
        return env
    },

    search : {
        mainSearch: (body) => modFetch('/api/search/mainSearch', body)
    },

    products: {
        filters: (body) => modFetch('/api/products/filters', body),
        getProducts: (body) => modFetch('/api/products/getProducts', body)
    }


};

export {api}