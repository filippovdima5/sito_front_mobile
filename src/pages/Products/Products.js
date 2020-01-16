import React, {Fragment}  from 'react';
import styles from './Products.module.scss';
import {useMountFetch} from "../../helpers/hooks/useMountFetch";
import {UpdateStateReplaceHistory} from "../../helpers/components/update_state_replace_history";

import {ControlProducts} from "../../components/Products/ControlProducts";
import { ProductsList } from "../../components/Products/ProductsList/ProductsList";

import { LoadMore } from "../../components/Products/LoadMore/LoadMore";
import {FiltersList} from "../../components/Products/FiltersList/animate/FiltersListAnimate";


function Products() {
    useMountFetch('/products');


    return (
        <Fragment>
            <UpdateStateReplaceHistory/>
            {console.log('PRODUCTS')}
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