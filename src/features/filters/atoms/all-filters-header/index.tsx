import React from 'react'
import styled from 'styled-components'
import { useEvent } from 'effector-react/ssr'
import { Close } from '../../../../assets/svg'
import styles from '../header.module.scss'
import { $setShowFilters } from '../../store'


export function AllFiltersHeader() {
  const setShowFilters = useEvent($setShowFilters)
  
  return (
    <S.Wrap className={styles.header}>
      <div className={styles.headerWrap}>
        
        <div className={styles.titleWrap}>
          <div className={styles.title}>Фильтры</div>
        </div>
        
        <div onClick={() => setShowFilters(false)} className={`${styles.btn} ${styles.btn_right}`}>
          <div className='icon-wrap'>
            <Close className='close-icon' />
          </div>
        </div>
      </div>
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
    & .icon-wrap {
      width: 15px;
      height: 15px;
      margin-right: 10px;
    }

    & .close-icon {
      width: 100%;
      height: 100%;
      position: relative;
      top: 50%;
      left: 50%;
      fill: rgba(0,0,0,.4);
    }
`
}
