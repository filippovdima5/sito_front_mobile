import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../../helpers/hooks/use-effector-store'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { $searchResult, $showResults } from '../store'
import styles from './styles.module.scss'


function SearchResult() {
  const modalSearchRef = useRef<HTMLDivElement | null>(null)
  const searchResults = useStore($searchResult)


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
              <Link to={'/'} className={styles.link}>
                {title}
                
                <span>
                  {/*<span className={styles.type}>({typeMainSearchResultItem[type]})</span>*/}
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

