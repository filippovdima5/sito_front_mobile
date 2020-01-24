import React, { Fragment }  from 'react'
import { ControlProducts } from '../../components/Products/ControlProducts'
import { ProductsList } from '../../components/Products/ProductsList/ProductsList'
import { LoadMore } from '../../components/Products/LoadMore/LoadMore'
import { FiltersList } from '../../components/Products/FiltersList/animate/FiltersListAnimate'
import { HookFirstUrl } from './hook-first-url'
import styles from './Products.module.scss'


const Products = React.memo(function Products() {
  return (
    <Fragment>
      <HookFirstUrl/>

      <div className={styles.Products}>
        <ControlProducts/>
        <ProductsList/>
        <LoadMore/>
      </div>

      <FiltersList/>
    </Fragment>
  )
})

export { Products }