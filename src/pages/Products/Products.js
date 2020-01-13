import React, {Fragment}  from 'react';
import styles from './Products.module.scss';


import {FetchUrl} from "./FetchUrl";

import {ControlProducts} from "../../components/Products/ControlProducts";
import { ProductsList } from "../../components/Products/ProductsList/ProductsList";

import { LoadMore } from "../../components/Products/LoadMore/LoadMore";
import {FiltersList} from "../../components/Products/FiltersList/animate/FiltersListAnimate";



function Products() {
    return (
        <Fragment>
            <FetchUrl/>

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