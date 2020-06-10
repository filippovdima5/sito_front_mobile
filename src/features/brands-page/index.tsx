import React  from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { Link } from 'react-router-dom'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { Loader } from '../../commons/templates/loader'
import { SexId } from '../../types'
import { sexIdToStr } from '../../lib'
import { $brands, $loadingBrands, $mountBrandsPage } from './store'
import styles from './styles.module.scss'
import { SearchInput } from './search-input'


function BrandsGroup({ brands, sexId }: {brands: Array<string>, sexId: SexId}) {
  return(
    <>
      {brands.map(item  => (
        <div key={item}>
          <li>
            <Link to={`/${sexIdToStr(sexId)}/products?brands=${item}`}>
              {item}
            </Link>
          </li>
        </div>
      ))}
    </>
  )}

export function BrandsPage({ sexId }: { sexId: SexId }) {
  const loader = useStore($loadingBrands)
  const charGroups = useStore($brands)
  const mountBrandsPage = useEvent($mountBrandsPage)
  
  useEffectSafe(() => {
    mountBrandsPage({ sex_id: sexId })
  }, [sexId])
  
  
  
  return (
    <div className={styles.brands}>
      {loader && <Loader/>}
      <div className={styles.wrap}>
      
        <div className={styles.search}>
          <SearchInput sexId={sexId}/>
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
