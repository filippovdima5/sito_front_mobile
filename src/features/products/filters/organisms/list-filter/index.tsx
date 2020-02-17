import React, { useState, useMemo } from 'react'
import {FiltersItemNumber, FiltersItemString, FiltersRequest} from '../../../../../api/types'
import { CheckRow } from '../../molecules/check-row'


type Props = {
  storeData: FiltersRequest['brands' | 'categories' | 'colors' | 'sizes'],
  stateData: Array<string | number> | null,
  sexId: 1 | 2,
}

const maxItemsView = 15

export function ListFilter({ sexId, stateData, storeData }: Props) {
  const [showAll, setShowAll] = useState<boolean>(storeData.length > maxItemsView)

  const dataList = useMemo(() => {
    if (showAll) return  storeData
    return  storeData.slice(0, maxItemsView)

  }, [storeData, showAll])


  return (
    <>
      {
        storeData.length > maxItemsView && (
          <input
            type={'text'}
            placeholder={'Поиск'}
          />
        )
      }


      <div>
        {(dataList as Array<FiltersItemString | FiltersItemNumber>).map(({ available, value }) => (
          <CheckRow
            key = {value}
            title={value == null ? '' : value.toString()}
            check={stateData === null ? false : stateData.includes(value)}
            disabled={!available}
            event={() => (console.log('f'))}/>
        ))}
      </div>


      {showAll && <button onClick={() => (setShowAll(true))}>Показать ещё</button>}

      <br/>

      <button>Сбросить</button>

    </>
  )
}

