import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'

import { useStore, useEvent } from 'effector-react/ssr'
import {$searchResult, $showResults, setModSearch} from '../store'
import { $sexLine } from '../../../stores/env'
import { setBrands } from '../../products-page/features/filters/store'

import styles from './styles.module.scss'



function SearchResult() {
  const modalSearchRef = useRef<HTMLDivElement | null>(null)
  const searchResults = useStore($searchResult)
  const sexLine = useStore($sexLine)
  
  const setModSearchEv = useEvent(setModSearch)
  const setBrandsEv = useEvent(setBrands)


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
                  setBrandsEv(title)
                  setModSearchEv()
                }}
                to={`/products/${sexLine !== null ? sexLine : ''}?brands=${title}`}
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
  const showResults = useStore($showResults)
  if (!showResults) return null


  return <SearchResult/>
}


export { ShowResults as SearchResult }

