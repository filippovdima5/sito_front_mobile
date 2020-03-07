import React, { useEffect } from 'react'
import { BrandItem } from '../../api/types'
import { setGender } from '../../stores/env'
import styles from './styles.module.scss'
import { Input } from '../../commons/atoms/input'
import {Link} from 'react-router-dom'
import { $filterBrands, loadBrands, setFilterString } from './store'
import { useStore } from '../../helpers/hooks/use-effector-store'


type Props = {
  sexId: 1 | 2,
}


function BrandsGroup({ brands }: {brands: Array<BrandItem>}) {
  return(
    <>
      {brands.map(({ _id }) => (
        <li><Link to={'/'}>{_id}</Link></li>
      ))}
    </>
  )
}

export function BrandsPage({ sexId }: Props) {
  
  
  useEffect(() => {setGender(sexId)}, [sexId])
  useEffect(() => {
    loadBrands(sexId)
  }, [sexId])
  
  const charGroups = useStore($filterBrands)
  
  return (
    <div className={styles.brands}>
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
                  <BrandsGroup brands={brands}/>
                </ol>
              </li>
            
            ))}
            
            

          </ul>
          
        </div>
      
      </div>
    </div>
  )
}
