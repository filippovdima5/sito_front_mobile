import React, { Fragment, useContext, useRef } from 'react'
import { useHistory } from 'react-router'


const createSearch = function(params) {
  if (!params) throw Error('Не переданы параметры для формирования search')

  return '?' + Object.entries(params)
    .map(([key, value])=>{
      if (Array.isArray(value)) return `${key}=${value.join('|')}`
      else return `${key}=${value}`
    })
    .join('&')
}

const createUrl = (historyFunc, path, params) => {
  if (!path) throw Error('Не передан path!')
  historyFunc(path + createSearch(params), params)
}

const ShiftHistory = React.createContext({ push: null, replace: null })

const RouterHistoryShift = React.memo(function RouterHistoryShift(props){
  const { push, replace } = useHistory()
  const shiftHistory = useRef({
    push: (path, params) => (createUrl( push, path, params)),
    replace: (path, params) => (createUrl(replace, path, params))
  }).current

  return (
    <ShiftHistory.Provider value = {shiftHistory}>
      <Fragment>
        {props.children}
      </Fragment>
    </ShiftHistory.Provider>
  )
})

const useShiftHistory = function useShiftHistory () {
  return  useContext(ShiftHistory)
}

export { RouterHistoryShift, useShiftHistory }