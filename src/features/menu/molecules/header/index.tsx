import React, { useEffect, useRef } from 'react'
import { createEvent, createStore } from 'effector'
import { useStore } from '../../../../helpers/hooks/use-effector-store'
import { setGender } from '../../../../stores/env'
import styles from './styles.module.scss'
import { useRouteMatch, useLocation, useParams } from 'react-router'


type HeaderProps = {
  sexId: 1 | 2 | 0,
}

const signalWithoutSexId = createStore<boolean | number>(false)
export const setSignalWithoutSexId = createEvent()
const setOrder = createEvent<number>()
signalWithoutSexId.on(setSignalWithoutSexId, state => !state)
signalWithoutSexId.on(setOrder, (state, payload) => payload)




function ButtonSex({ sexId, signal, currentSex }: { sexId: 1 | 2, signal: number | boolean, currentSex: 1 | 2 | 0 }) {
  return(
    <>
      <button className={`${styles.button} ${signal === sexId && styles.buttonScale}`}>{sexId === 1 ? 'Мужское' : 'Женское'}</button>
      <div className={`${styles.bottomLine} ${sexId === currentSex ? styles.bottomLine_true : styles.bottomLine_false}`}/>
    </>
  )
}


// function LinksToggle({ signal }): { signal: 1 | 2 } {
//   return (
//
//   )
// }




export function Header ({ sexId }: HeaderProps) {
  const timerSignal = useRef<any>(null)
  
  const { pathname } = useLocation()
  
  const signal = useStore(signalWithoutSexId)
  useEffect(() => {
    if (signal) {
      switch (signal) {
        case 1:
          timerSignal.current = setTimeout(() => { setOrder(2) }, 300); break
        case 2:
          timerSignal.current = setTimeout(() => { setSignalWithoutSexId() }, 300); break
        default:
          timerSignal.current = setTimeout(() => { setOrder(1) }, 100); break
      }
    }
    // @ts-ignore
    return () => clearTimeout(timerSignal.current as NonNullable<any>)
  }, [signal])


  return (
    <div className={styles.Header}>
      <div onClick={() => (setGender(1))} className={styles.buttonWrap}>
        <ButtonSex sexId={1} signal={signal} currentSex={sexId}/>
      </div>

      <div onClick={() => (setGender(2))} className={styles.buttonWrap}>
        <ButtonSex sexId={2} signal={signal} currentSex={sexId}/>
      </div>
    </div>
  )
}

