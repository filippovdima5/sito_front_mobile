import React  from 'react'
import { StatusLoad } from '../../../types'
import { ProductCard, SkeletonCard } from '../../../commons/organisms/product-card'
import config from '../../../config'
import { ShortProduct } from '../../../api/v1/types'
import { EmptyList } from './empty-list'
import styles from './styles.module.scss'



function SkeletonsList({ length }: { length: number }) {
  return <>{Array.from({ length }).map((_, i) => (<SkeletonCard key={i}/>))}</>
}

function ProductsList() {
  const data = [] as Array<ShortProduct>
  return (
    <>
      {data.map(item => (
        <ProductCard showLike={true} key={item.id} {...item}/>
      ))}
    </>
  )
}

function Controller({ status, lengthSkeleton, loading }: { status: StatusLoad, loading: boolean, lengthSkeleton: number }) {
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
  
  return (
    <div className={styles.wrap}>
      {/*{loading && <Loader/>}*/}
      {/*<Controller status={status} lengthSkeleton={lengthSkeleton} loading={loading}/>*/}
    </div>
  )
}

export { List as ProductsList }
