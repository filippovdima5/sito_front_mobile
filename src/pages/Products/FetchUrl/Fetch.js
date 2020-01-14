import React, { useEffect, useState} from 'react';
import useRouter from "use-react-router";
import {useUpdateEffect, useMount} from "react-use";
import {fetchFilters} from "../../../components/Products/FiltersList/filterListStore";
import {fetchProducts} from "../../../components/Products/productsStore";

import {setSomeFilters} from "../../../components/Products/FiltersList/filterListStore";


const detectSex = (sex_id) => {
    switch (sex_id) {
        case 'men': return 1;
        case 'women': return 2;
        default: return 0
    }
};

const parseSearch = (search) => {
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



const Fetch = React.memo(() => {
    const {match: {params: {sex}}, location: {search, state}} = useRouter();
    const [sexId, setSexId] = useState(0);
    const [params, setParams] = useState({});

    useEffect(() => {
        setSexId(detectSex(sex));
    }, [sex]);

    useEffect(() => {
        if (state) setParams(state);
        else {
            if (search) setParams(parseSearch(search));
            else setParams({});
        }
    }, [search, state]);

    // useMount(() => {
    //     console.log(params)
    //    setSomeFilters(params)
    // });

    useUpdateEffect(() => {
        fetchProducts({sex_id: sexId, ...params});
        fetchFilters({sex_id: sexId, ...params});

        setSomeFilters(params);

        console.log(params)
    }, [sexId, params]);




});

export {Fetch}