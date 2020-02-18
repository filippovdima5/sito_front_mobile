import React from 'react'
import { setShowFilters } from '../../store'



type Props = {
  storeData: Array<number | null> | null,
  stateData: Array<number | null> | null,
  filter_to: 'price_to' | 'sale_to',
  filter_from: 'price_from' | 'sale_from',
}


export function RangeFilter({storeData, stateData, filter_from, filter_to}: Props) {
  return (
    <>
      <input value={stateData[0]} type={'tel'}/>
      <input value={stateData[1]} type={'tel'}/>

      <br/>

      <button onClick={() => setShowFilters(false)}>Готово</button>

    </>
  )
}