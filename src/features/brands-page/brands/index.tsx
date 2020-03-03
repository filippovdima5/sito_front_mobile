import React, {useEffect} from 'react'
import {setGender} from '../../../stores/env'


type Props = {
  sexId: 1 | 2,
}

export function Brands({ sexId }: Props) {
  useEffect(() => {setGender(sexId)}, [])
  
  
  return (
    <div>Brnads {sexId}</div>
  )
}
