import React, {Fragment}  from 'react';
import styles from './Products.module.scss';
import {HookFirstUrl} from "./hook-first-url";

import {ControlProducts} from "../../components/Products/ControlProducts";
import { ProductsList } from "../../components/Products/ProductsList/ProductsList";

import { LoadMore } from "../../components/Products/LoadMore/LoadMore";
import {FiltersList} from "../../components/Products/FiltersList/animate/FiltersListAnimate";



const Products = React.memo(function Products() {

    return (
        <Fragment>
            <HookFirstUrl/>

            {console.log('PRODUCTS')}
            <div className={styles.Products}>
                <ControlProducts/>
                <ProductsList/>


                <div>ldmkf</div>

                <LoadMore/>
            </div>
            <FiltersList/>
        </Fragment>
    )
})

export {Products}