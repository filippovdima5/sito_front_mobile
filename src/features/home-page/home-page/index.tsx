import React, {useEffect} from 'react'
import { setGender } from '../../../stores/env'
import { CategoryStand } from '../molecules/category-stand'
import { PartnersSlider } from '../molecules/partners-slider'
import { BrandStand } from '../molecules/brand-stand'



type Props = {
  sexId: 1 | 2,
}

export function HomePage({ sexId }: Props) {
  useEffect(() => {setGender(sexId)}, [ sexId ])

  return (
    <>
      <CategoryStand
        height={52}
        sexId={sexId}
        index={0}
      />

      <BrandStand
        height={40}
        title={'Бренды'}
        img={'/'}
        url={'/brands'}
      />

      <CategoryStand
        height={52}
        index={1}
        sexId={sexId}
      />

      <PartnersSlider/>

      <CategoryStand
        height={52}
        sexId={sexId}
        index={2}
      />
    </>
  )
}
