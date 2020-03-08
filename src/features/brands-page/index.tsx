import React  from 'react'
import {Link} from 'react-router-dom'
import { useEffectSafe } from '../../helpers/hooks/use-effect-safe'
import { sexIdToStr } from '../../helpers/lib'

import { BrandItem } from '../../api/types'
import { useStore, useEvent } from 'effector-react/ssr'
import { setGender } from '../../stores/env2'

import { $filterBrands, loadBrands, setFilterString, $loadingBrands } from './store'
import { setBrands } from '../products-page/features/filters/store'

import { Input } from '../../commons/atoms/input'
import { Loader } from '../../commons/templates/loader'

import styles from './styles.module.scss'


type Props = {
  sexId: 1 | 2,
}


function BrandsGroup({ brands, sexId }: {brands: Array<BrandItem>, sexId: 1 | 2}) {
  const setBrandsEv = useEvent(setBrands)
  return(
    <>
      {brands.map(({ _id }) => (
        <li>
          <Link
            to={`/products/${sexIdToStr(sexId)}?brands=${_id}`}
            onClick={() => setBrandsEv(_id)}
          >
            {_id}
          </Link>
        </li>
      ))}
    </>
  )
}

export function BrandsPage({ sexId }: Props) {
  const loader = useStore($loadingBrands)
  const setFilterStringEv = useEvent(setFilterString)
  
  useEffectSafe(() => {
    setGender(sexId)
    loadBrands(sexId)
  }, [sexId])

  
  const charGroups = useStore($filterBrands)
  
  return (
    <div className={styles.brands}>
      {loader && <Loader/>}
      <div className={styles.wrap}>
      
        <div className={styles.search}>
          <Input
            onChange={(event => setFilterStringEv(event.currentTarget.value))}
            placeholder={'Поиск по названию бренда'}
            type={'text'}
          />
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
