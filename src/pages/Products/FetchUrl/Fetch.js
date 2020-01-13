import React, {Fragment, useEffect} from 'react';
import useRouter from "use-react-router";
import {params} from "./fetchStore";

import {fetchFilters} from "../../../components/Products/FiltersList/filterListStore";
import {fetchProducts} from "../../../components/Products/productsStore";

const Fetch = React.memo(() => {
    const {match: {params: {sex}}, location: {search}} = useRouter();

    useEffect(() => {
        console.log(sex, search);
        fetchFilters({sex_id: 1});
        fetchProducts({sex_id: 1})
    }, [sex, search]);

    return (
        <Fragment>

        </Fragment>
    )
});

export {Fetch}