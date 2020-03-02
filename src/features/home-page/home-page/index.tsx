import React, {useEffect} from 'react'
import { setGender } from '../../../stores/env'
import { SmoothSlider } from '../smooth-slider'
import { ScrollSlider } from '../scroll-slider'


type Props = {
  sexId: 1 | 2,
}

export function HomePage({ sexId }: Props) {
  useEffect(() => {setGender(sexId)}, [ sexId ])

  return (
    <>
      <SmoothSlider
        height={52}
        title={'Одежда'}
        img={'/'}
        url={'/'}
      />

      <SmoothSlider
        height={40}
        title={'Бренды'}
        img={'/'}
        url={'/'}
      />

      <SmoothSlider
        height={52}
        title={'Обувь'}
        img={'/'}
        url={'/'}
      />

      <ScrollSlider

      />

      <SmoothSlider
        height={52}
        title={'Аксессуары'}
        img={'/'}
        url={'/'}
      />
    </>
  )
}
