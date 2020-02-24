import React from 'react'
import { useStore } from '../../../helpers/hooks/use-effector-store'
import { $productsStore } from '../../../pages/products/store'
import { ProductCard, SkeletonCard } from '../product-card'
import styles from './styles.module.scss'


// todo скелетоны!
const dataSkeleton: Array<number> = []
for (let i = 0; i < 20; i++){
  dataSkeleton.push(i)
}


function SkeletonsList() {
  return (
    <>
      {dataSkeleton.map(item => (<SkeletonCard key={item}/>))}
    </>
  )
}

function ProductsList() {
  const data = useStore($productsStore)
  return (
    <>
      {data.map(item => (
        <ProductCard key={item.id} {...item}/>
      ))}
    </>
  )
}

function List() {
  const viewData = useStore($productsStore).length > 0
  return (
    <div className={styles.productsList}>
      {viewData ?
        <ProductsList/>
        :
        <SkeletonsList/>
      }
    </div>
  )
}

export { List as ProductsList }