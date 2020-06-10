import React, { useEffect, useMemo, useRef } from 'react'
import { Link , useLocation } from 'react-router-dom'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { useStore, useEvent } from 'effector-react/ssr'
import { $searchResult, $setModSearch, $modSearch } from '../store'
import { $mountProductsPage } from '../../products-page/store'
import { findSexIdInPathNotStrict, sexIdToStr } from '../../../lib'
import styles from './styles.module.scss'



function  SearchResult() {
  const modalSearchRef = useRef<HTMLDivElement | null>(null)
  const mountProductsPage = useEvent($mountProductsPage)
  const searchResults = useStore($searchResult)
  const setModSearch = useEvent($setModSearch)
  
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPathNotStrict(pathname), [pathname])


  useEffect(() => {
    disableBodyScroll(modalSearchRef.current as NonNullable<HTMLDivElement>)
    return (() => {
      clearAllBodyScrollLocks()
    })
  }, [])
  
  



  return (
    <div
      ref = {modalSearchRef}
      className={styles.modal}
    >
      <div   className={styles.modalBody}>
        <ul className={styles.list}>
          
          {searchResults.map(({ count, title }) => (
            <li key={title} className={styles.title}>
              <Link
                onClick={() => {
                  setModSearch({ mod: false, sex_id: sexId })
                  mountProductsPage({ pathname: (sexId ? `/${sexIdToStr(sexId)}` : '/women' ), search: `?brands=${title}` })
                }}
                to={sexId ? `/${sexIdToStr(sexId)}/products?brands=${title}` : `/women/products?brands=${title}`}
                className={styles.link}
              >
                {title}
                
                <span>
                  <span className={styles.count}>{count}</span>
                </span>
                
              </Link>
            </li>
          ))}

          <div className={styles.space}/>

        </ul>
      </div>
    </div>
  )
}


function ShowResults() {
  const modSearch = useStore($modSearch)
  if (!modSearch) return null


  return <SearchResult/>
}


export { ShowResults as SearchResult }

