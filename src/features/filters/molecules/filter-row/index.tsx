import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import { ViewFilterItem } from '../../../products-page/lib'
import { Arrow } from '../../../../assets/svg'
import { $skipFilter } from '../../../products-page/store'
import { $countHelpsHint, $setContHelpHint } from './store'
import styles from './styles.module.scss'


interface Props extends ViewFilterItem{
  isFirst?: boolean,
}

export function FilterRow({ label, title, isFirst, index }: Props ) {
  const setContHelpHint = useEvent($setContHelpHint)
  const skipFilter = useEvent($skipFilter)
  
  const rowRef = useRef<HTMLDivElement>(null)
  const skipRowRef = useRef<HTMLDivElement>(null)
  const [skipStyle, setSkipStyle] = useState('')
  const [skipAnimate, setSkipAnimate ] = useState<boolean>(true)
  const [skipLength, setSkip] = useState(0)
  
  // region
  const xPosition = useRef(0)
  
  const handleTouchStart = useCallback((e) => {
    setSkipAnimate(false)
    xPosition.current = e.touches[0].pageX + skipLength
    setSkipStyle('')
  }, [skipLength])
  
  const handleTouchMove = useCallback((e: any) => {
    setSkip(xPosition.current - e.touches[0].pageX)
  }, [xPosition])
  
  const handleTouchEnd = useCallback(() => {
    const elemRow = rowRef.current as HTMLDivElement
    const percentSkip = skipLength / elemRow.clientWidth
    
    setSkipStyle(styles.show_skip)
    
    if (percentSkip < 0.2) setSkip(0)
    if (percentSkip >= 0.2 && percentSkip <= 0.5) setSkip(0.4 * elemRow.clientWidth)
    if (percentSkip > 0.5) setSkip(elemRow.clientWidth)
  }, [skipLength])
  // endregion
  
  // region
  const countHelpHint = useStore($countHelpsHint)
  const countHelpRef = useRef(countHelpHint)
  useEffect(() => {countHelpRef.current = countHelpHint}, [countHelpHint])
  
  useEffect(() => {
    let timerIn: any, timerOut: any
    if (isFirst && countHelpRef.current < 2)  {
      const elemRow = rowRef.current as HTMLDivElement
      timerIn = setTimeout(() => {
        setSkip(0.4 * elemRow.clientWidth)
        setContHelpHint()
      }, 2000)
      timerOut = setTimeout(() => setSkip(0), 5000)
    }
    
    return () => {
      if (isFirst) {
        clearTimeout(timerIn)
        clearTimeout(timerOut)
      }
    }
  }, [isFirst, setContHelpHint])
  // endregion
  
  
  // region
  useEffect(() => {
    const elem = skipRowRef.current
    if (Boolean(label)) {
      elem?.addEventListener('touchstart', handleTouchStart)
      elem?.addEventListener('touchmove', handleTouchMove)
      elem?.addEventListener('touchend', handleTouchEnd)
    }
    
    return () => {
      elem?.removeEventListener('touchstart', handleTouchStart)
      elem?.removeEventListener('touchmove', handleTouchMove)
      elem?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, label])
  // endregion
  
  
  // region
  useEffect(() => {
    if (skipLength === rowRef.current?.clientWidth) {
      const timer = setTimeout(() => skipFilter(index), 150)
      return () => clearTimeout(timer)
    }
  }, [ index, skipFilter, skipLength ])
  // endregion
  
  
  return (
    <div
      ref={rowRef}
      className={`${styles.filterRow} ${skipStyle}`}
    >
      <div
        style={{ left: `-${skipLength}px` }}
        ref={skipRowRef}
        className={`${styles.item_wrap} ${skipAnimate && styles.skipAnimate}`}
      >
        <div className={styles.item}>
          
          <div className={styles.item_text_wrap}>
            <div className={styles.title_filter_wrap}>
              <div>{title}</div>
            </div>
  
            <div className={styles.active_filters_wrap}>
              {label}
            </div>
            
          </div>
          
          <div className={styles.item_arrow_wrap}>
            <Arrow rotate={270} className={styles.svg}/>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => skipFilter(index)}
        style={{ width: `${skipLength}px` }}
        className={`${styles.skip_one} ${skipAnimate && styles.skipAnimateButton}`}
      >
        Сбросить
      </button>
    </div>
  )
}


