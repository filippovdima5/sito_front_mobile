import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { filtersMap, ViewFilter } from '../../types'
import { namesCategory } from '../../../../constants/category-keys'
import rightArrowSVG from '../../../../media/img/svg/rightArrow.svg'
import { $countHelpsHint, setContHelpHint } from './store'
import styles from './styles.module.scss'


export { UnuseFilterRow } from './unuse-filter-row'


export function FilterRow(props: ViewFilter) {
  const setContHelpHintEv = useEvent(setContHelpHint)

  
  
  const activeFiltersString = useMemo(() => {
    let string: string
    switch (props.type) {
      case 'list-translate': string = props.data.map(i => namesCategory[props.sexId][i]).join(', '); break
      case 'list': string = props.data.join(', '); break
      case 'range': {
        const min = props.data[0] ? `от ${props.data[0]}` : ''
        const max = props.data[1] ? ` до ${props.data[1]}` : ''
        string = min + max
      }
    }
    string = string.length > 37 ? string.substr(0, 34) + '...' : string
    return string
  }, [ props ])

  const rowRef = useRef<HTMLDivElement>(null)
  const skipRowRef = useRef<HTMLDivElement>(null)
  const xPosition = useRef(0)
  const [skipLength, setSkip] = useState(0)
  const [skipStyle, setSkipStyle] = useState('')
  const [skipAnimate, setSkipAnimate ] = useState<boolean>(true)

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

  
  const countHelpHint = useStore($countHelpsHint)
  const countHelpRef = useRef(countHelpHint)
  useEffect(() => {countHelpRef.current = countHelpHint}, [countHelpHint])
  
  useEffect(() => {
    let timerIn: any, timerOut: any
    if (props.isFirst && countHelpRef.current < 2)  {
      const elemRow = rowRef.current as HTMLDivElement
      timerIn = setTimeout(() => {
        setSkip(0.4 * elemRow.clientWidth)
        setContHelpHintEv()
      }, 2000)
      timerOut = setTimeout(() => setSkip(0), 5000)
    }

    return () => {
      if (props.isFirst) {
        clearTimeout(timerIn)
        clearTimeout(timerOut)
      }
    }
    // eslint-disable-next-line
  }, [props.isFirst])


  useEffect(() => {
    const elem = skipRowRef.current
    elem?.addEventListener('touchstart', handleTouchStart)
    elem?.addEventListener('touchmove', handleTouchMove)
    elem?.addEventListener('touchend', handleTouchEnd)

    return () => {
      elem?.removeEventListener('touchstart', handleTouchStart)
      elem?.removeEventListener('touchmove', handleTouchMove)
      elem?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])


  // const skipFilter = useCallback(() => {
  //   switch (props.title) {
  //     case 'prices': {
  //       setFilterEv({ key: 'price_from', value: null })
  //       setFilterEv({ key: 'price_to', value: null })
  //       break
  //     }
  //     case 'sales': {
  //       setFilterEv({ key: 'sale_from', value: null })
  //       setFilterEv({ key: 'sale_to', value: null })
  //       break
  //     }
  //     default: setFilterEv({ key: props.title, value: null })
  //   }
  // }, [props.title, setFilterEv])



  // useEffect(() => {
  //   if (skipLength === rowRef.current?.clientWidth ){
  //     const timer = setTimeout(skipFilter, 150)
  //     return () => clearTimeout(timer)
  //   }
  // }, [ props.title, skipLength, skipFilter ])


  return (
    <div
      ref = { rowRef }
      className={`${styles.filterRow} ${skipStyle}`}
    >
      <div
        // onClick={() => setShowFilterEv(props.title)}
        ref = { skipRowRef }
        style={{ left: `-${skipLength}px` }}
        className={`${styles.item_wrap} ${skipAnimate && styles.skipAnimate}`}
      >

        <div className={styles.item}>
          <div className={styles.item_text_wrap}>
            <div className={styles.title_filter_wrap}>
              <div>{filtersMap[props.title]}</div>
            </div>
            <div className={styles.active_filters_wrap}>
              <div>{activeFiltersString}</div>
            </div>
          </div>
          
          <div className={styles.item_arrow_wrap}>
            <img src={rightArrowSVG} alt={'go'} className={styles.svg}/>
          </div>
        </div>
      </div>

      <button
        // onClick={() => skipFilter()}
        style={{ width: `${skipLength}px` }}
        className={`${styles.skip_one} ${skipAnimate && styles.skipAnimateButton}`}
      >
        Сбросить
      </button>

    </div>
  )
}
