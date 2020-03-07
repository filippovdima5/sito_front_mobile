import React, { useEffect } from 'react'
import { BrandItem } from '../../api/types'
import { setGender } from '../../stores/env'
import styles from './styles.module.scss'
import { Input } from '../../commons/atoms/input'
import {Link} from 'react-router-dom'
import { $filterBrands, loadBrands, setFilterString, $loadingBrands } from './store'
import { sexIdToStr } from '../../helpers/lib'
import { setBrands } from '../products-page/features/filters/store'
import { useStore } from '../../helpers/hooks/use-effector-store'
import { Loader } from '../../commons/templates/loader'


type Props = {
  sexId: 1 | 2,
}


function BrandsGroup({ brands, sexId }: {brands: Array<BrandItem>, sexId: 1 | 2}) {
  return(
    <>
      {brands.map(({ _id }) => (
        <li>
          <Link
            to={`/products/${sexIdToStr(sexId)}?brands=${_id}`}
            onClick={() => setBrands(_id)}
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
  
  useEffect(() => {setGender(sexId)}, [sexId])
  useEffect(() => {
    loadBrands(sexId)
  }, [sexId])
  
  const charGroups = useStore($filterBrands)
  
  return (
    <div className={styles.brands}>
      {loader && <Loader/>}
      <div className={styles.wrap}>
      
        <div className={styles.search}>
          <Input
            onChange={(event => setFilterString(event.currentTarget.value))}
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
