import React, { useState, useMemo, useEffect } from 'react'
import { FiltersItemNumber, FiltersItemString, FiltersRequest } from '../../../../../api/types'
import { CheckRow } from '../../molecules/check-row'
import { setFilter } from '../../../../../pages/products/store'
import { namesCategory } from '../../../../../constants/category-keys'
import { setShowFilters, skipThisFilter } from '../../store'


type Props = {
  storeData: FiltersRequest['brands' | 'categories' | 'colors' | 'sizes'],
  stateData: Array<string | number> | null,
  sexId: 1 | 2,
  filter: 'brands' | 'categories' | 'colors' | 'sizes',
}

const titleVew = (title: number | string | null, sexId: 1 | 2): string => {
  switch (typeof title) {
    case 'object': return ''
    case 'number': return namesCategory[sexId][title as keyof typeof namesCategory['1' | '2'] ]
    default: return title
  }
}

const maxItemsView = 10

export function ListFilter({ sexId, stateData, storeData, filter }: Props) {
  const [showAll, setShowAll] = useState<boolean>(storeData.length < maxItemsView)
  const [ searchPhrase, setSearchPhrase ] = useState<string | null>(null)

  useEffect(() => {
    if (searchPhrase !== null) setShowAll(true)
    if (searchPhrase === '') setSearchPhrase(null)
  }, [ searchPhrase ])

  const dataList = useMemo(() => {

    // todo: Выпилить на серваке возможность проскачки null!!!
    const preData = (storeData as Array<FiltersItemString | FiltersItemNumber>).filter(item => item.value != null )

    if (searchPhrase !== null) {
      const reqExp = new RegExp(`${searchPhrase}`, 'i')
      return (preData as Array<FiltersItemString | FiltersItemNumber>)
        .filter(item => ( item.value.toString().search(reqExp) > 0 ))
        .sort((a, b) => ( b.value.toString().search(reqExp) - a.value.toString().search(reqExp) ))
    }

    if (showAll) return  preData
    return  preData.slice(0, maxItemsView)

  }, [storeData, showAll, searchPhrase ])


  return (
    <>
      {
        storeData.length > maxItemsView && filter !== 'categories' &&(
          <input
            onChange={(event => { setSearchPhrase( event.currentTarget.value ) })}
            type={'text'}
            placeholder={'Поиск'}
          />
        )
      }


      <div>
        {(dataList as Array<FiltersItemString | FiltersItemNumber>).map(({ available, value }) => (
          <CheckRow
            key = {value}
            title={titleVew(value, sexId)}
            check={stateData === null ? false : stateData.includes(value)}
            disabled={!available}
            event={() => (setFilter({ key: filter, value }))}/>
        ))}
      </div>


      {!showAll && <button onClick={() => (setShowAll(true))}>Показать ещё</button>}

      <br/>

      <button onClick={() => skipThisFilter({ key: filter })}>Сбросить</button>

      <br/>

      <button onClick={() => setShowFilters(false)}>Готово</button>

    </>
  )
}

