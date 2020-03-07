import React  from 'react'
import { useStore } from '../../../helpers/hooks/use-effector-store'
import { $productsStore, $loadingProducts, $statusPageProducts, $lengthSkeletonData } from '../store'
import { ProductCard, SkeletonCard } from '../../../commons/organisms/product-card'
import styles from './styles.module.scss'
import config from '../../../config'
import {StatusPage} from '../types'
import { EmptyList } from './empty-list'
import { Loader } from '../../../commons/templates/loader'


function SkeletonsList({ length }: { length: number }) {
  return <>{Array.from({ length }).map((_, i) => (<SkeletonCard key={i}/>))}</>
}

function ProductsList() {
  const data = useStore($productsStore)
  return (
    <>
      {data.map(item => (
        <ProductCard showLike={true} key={item.id} {...item}/>
      ))}
    </>
  )
}

function Controller({ status, lengthSkeleton, loading }: { status: StatusPage, loading: boolean, lengthSkeleton: number }) {
  switch (status) {
    case 'EMPTY': return (<EmptyList/>)
    case 'FAIL': return (<div>ОШИБКА</div>)
    default: return (
      <div className={styles.productsList}>
        <ProductsList/>
        {(loading || status === 'START') && !config.ssr && <SkeletonsList length={lengthSkeleton}/>}
      </div>
    )
  }
}

function List() {
  const status = useStore($statusPageProducts)
  const loading = useStore($loadingProducts)
  const lengthSkeleton = useStore($lengthSkeletonData)
  
  return (
    <div className={styles.wrap}>
      {loading && <Loader/>}
      <Controller status={status} lengthSkeleton={lengthSkeleton} loading={loading}/>
    </div>
  )
}

export { List as ProductsList }