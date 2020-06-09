import React  from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { BrandItem } from '../../api/v1/types'
import { Loader } from '../../commons/templates/loader'
import { $filteredBrands, $fetchBrands, $setFilterString, $loadingBrands } from './store'

import styles from './styles.module.scss'


type Props = {
  sexId: 1 | 2,
}


function BrandsGroup({ brands, sexId }: {brands: Array<BrandItem>, sexId: 1 | 2}) {
  return(
    <>
      {brands.map(({ _id }) => (
        <div key={_id}/>
        // <li>
        //   <Link
        //     to={`/products/${sexIdToStr(sexId)}?brands=${_id}`}
        //     onClick={() => setBrands(_id)}
        //   >
        //     {_id}
        //   </Link>
        // </li>
      ))}
    </>
  )
}

export function BrandsPage({ sexId }: Props) {
  const loader = useStore($loadingBrands)
  const charGroups = useStore($filteredBrands)
  
  const fetchBrands = useEvent($fetchBrands)
  const setFilterString = useEvent($setFilterString)
  
  
  useEffectSafe(() => {
    fetchBrands({ sexId })
  }, [sexId])

  
  return (
    <div className={styles.brands}>
      {loader && <Loader/>}
      <div className={styles.wrap}>
      
        <div className={styles.search}>
          INPUT
          {/*<Input*/}
          {/*  onChange={(event => setFilterString(event.currentTarget.value))}*/}
          {/*  placeholder={'Поиск по названию бренда'}*/}
          {/*  type={'text'}*/}
          {/*/>*/}
        </div>
        
        <div className={styles.scrollContainer}>
          <ul className={styles.scrollBox}>
            {charGroups.map(({ char, brands }) => (
              <li className={styles.charGroup} key={char}>
                <h3 className={styles.char}>{char}</h3>
                <ol className={styles.brandsGroup}>
                  <BrandsGroup sexId={sexId} brands={brands}/>
                </ol>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
