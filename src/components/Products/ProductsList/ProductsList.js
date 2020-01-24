import React, { Fragment } from 'react'
import { useStore } from 'effector-react'
import { productsStore } from '../../../pages/Products/store'
import styles from './ProductsList.module.scss'
import { ProductCard } from './ProductCard/ProductCard'


const dataSkeleton = []
for (let i = 0; i < 20; i++){
  dataSkeleton.push(i)
}


const ProductsList = React.memo(() => {
  const data = useStore(productsStore)
  //const loader = !useStore(loadingProducts);

  return (
    <Fragment>

      {
        (data.length === 0) ?
          <div id={'ProductsList'} className={styles.ProductsList}>
            {dataSkeleton.map(item => (
              <ProductCard key  = {item} />
            ))}
          </div>
          :
          <div className={styles.ProductsList}>
            {data.map(({ id, img, brand, title, oldprice, price, sale }) => (
              <ProductCard
                key = {id}
                img = {img[0]}
                title={title}
                brand={brand}
                oldprice={oldprice}
                price={price}
                sale={sale}
              />
            ))}
          </div>
      }
    </Fragment>
  )
})

export { ProductsList }