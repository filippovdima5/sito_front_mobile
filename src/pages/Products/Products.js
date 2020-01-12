import React, {Fragment, useEffect}  from 'react';
import styles from './Products.module.scss';
import { fetchProducts } from "../../components/Products/productsStore";
import { fetchFilters } from "../../components/Products/FiltersList/filterListStore";


import {ControlProducts} from "../../components/Products/ControlProducts/ControlProducts";
import { ProductsList } from "../../components/Products/ProductsList/ProductsList";

import { LoadMore } from "../../components/Products/LoadMore/LoadMore";
import {FiltersList} from "../../components/Products/FiltersList/animate/FiltersListAnimate";



function Products() {
   useEffect(() => {
       fetchProducts({sex_id: 1});
       fetchFilters({sex_id: 1});
   }, []);

    return (
        <Fragment>
            <div className={styles.Products}>
                <ControlProducts/>
                <ProductsList/>
                <LoadMore/>
            </div>
            <FiltersList/>
        </Fragment>
    )
}

export {Products}