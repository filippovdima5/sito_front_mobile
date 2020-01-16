import {useEffect, useRef} from 'react';
import useRouter from "use-react-router";
import {fetchProducts} from "../../components/Products/productsStore";
import {fetchFilters} from "../../components/Products/FiltersList/filterListStore";

const parseSex = (sex) => {
    switch (sex) {
        case 'men': return 1;
        case 'women': return 2;
        default: return 0
    }
};

const parseSearch =  (search) => {
    if (!search) return {};
    return Object.fromEntries(
        decodeURI(search)
            .split('?')[1]
            .split('&')
            .map(item => (item.split('=')))
            .map(([key, value]) => (
                [key, value.split('|')
                    .map(value => ((+value) ? +value : value))]
            ))
    )
};

const routsRollParse = {
  '/products': (params, search) => {
      const fetchParams = {sex_id: parseSex(params.sex, search), ...parseSearch(search)};
      fetchProducts(fetchParams);
      fetchFilters(fetchParams);
  }
};

export function useMountFetch(routePath) {
    const {location: {search, hash}, match: {params}} = useRouter();
    const routInfo = useRef({params, search, hash});
    const routePathRef = useRef(routePath);

    useEffect(() => {
        routsRollParse[routePathRef.current](routInfo.current.params, routInfo.current.search);
    }, []);

}