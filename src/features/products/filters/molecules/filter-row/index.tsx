import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { namesCategory } from '../../../../../constants/category-keys'
import rightArrowSVG from '../../../../../media/img/svg/rightArrow.svg'
import styles from './styles.module.scss'


export { UnuseFilterRow } from './unuse-filter-row'


const filtersMap = {
  brands: 'Бренды',
  categories: 'Категории',
  colors: 'Цвета',
  sizes: 'Размеры',
  prices: 'Цена',
  sales: 'Скидка',
  favorite: 'Топовые'
} as const


type Props = {
  sexId: 1 | 2,
  type: 'list-translate',
  data: Array<keyof typeof namesCategory['1' | '2']>,
  title: keyof typeof filtersMap,
} | {
  sexId: 1 | 2,
  type: 'range',
  data:  [number, number],
  title: keyof typeof filtersMap,
} | {
  sexId: 1 | 2,
  type: 'list',
  data: Array<string>,
  title: keyof typeof filtersMap,
}


export function FilterRow(props: Props) {
  const activeFiltersString = useMemo(() => {
    let string: string
    switch (props.type) {
      case 'list-translate': string = props.data.map(i => namesCategory[props.sexId][i]).join(', '); break
      case 'list': string = props.data.join(', '); break
      case 'range': string = `от ${props.data[0]} до ${props.data[1]}`
    }
    string = string.length > 37 ? string.substr(0, 34) + '...' : string
    return string
  }, [ props ])

  const rowRef = useRef<HTMLDivElement>(null)
  const skipRowRef = useRef<HTMLDivElement>(null)
  const xPosition = useRef(0)
  const [skipLength, setSkip] = useState(0)
  const [skipStyle, setSkipStyle] = useState('')


  const handleTouchStart = useCallback((e) => {
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
  


  return (
    <div ref = { rowRef } className={`${styles.filterRow} ${skipStyle}`}>
      <div
        ref = { skipRowRef }
        style={{ left: `-${skipLength}px` }}
        className={styles.item_wrap}
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
        style={{ width: `${skipLength}px` }}
        className={styles.skip_one}
      >
        Сбросить
      </button>

    </div>
  )
}