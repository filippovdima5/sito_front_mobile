import React, {useEffect} from 'react'
import { sexIdToStr } from '../../../helpers/lib'
import { setGender } from '../../../stores/env'
import { CategoryStand } from '../molecules/category-stand'
import { PartnersSlider } from '../molecules/partners-slider'
import { BrandStand } from '../molecules/brand-stand'
import styles from './styles.module.scss'



type Props = {
  sexId: 1 | 2,
}

export function HomePage({ sexId }: Props) {
  useEffect(() => {setGender(sexId)}, [ sexId ])

  return (
    <div className={styles.home}>
      <div className={styles.wrap}>
        
        <CategoryStand
          height={52}
          sexId={sexId}
          index={0}
        />
  
        <BrandStand
          height={40}
          title={'Бренды'}
          img={'/'}
          url={`/brands/${sexIdToStr(sexId)}`}
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
      
      </div>
    </div>
  )
}
