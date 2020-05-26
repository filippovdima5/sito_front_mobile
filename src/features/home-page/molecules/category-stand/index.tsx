import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useEvent } from 'effector-react/ssr'
// import { Title } from '../../atoms/title'
import { namesCategory } from '../../../../constants/category-keys'
import { sexIdToStr } from '../../../../helpers/lib'
import { setCategories } from '../../../products-page/features/filters/store'
import styles from './styles.module.scss'


// todo: Потом что то подобное должно хранится у юзера
const category = {
  1: [ 2001, 2002, 1006 ],
  2: [ 1011, 2001, 1004 ]
} as const


type Props = {
  sexId: 1 | 2,
  height: number,
  index: 0 | 1 | 2,
}

export function CategoryStand({ height, sexId, index }: Props) {
  
  const setCategoriesEv = useEvent(setCategories)
  const categoryId = useMemo(() => category[sexId][index], [sexId, index])
  const title = useMemo(() => namesCategory[sexId][categoryId], [ categoryId, sexId ])
  
  return (
    <div>
      <div style={{ paddingTop: `${height}%` }} className={styles.wrap}>
        <img className={styles.img} src={`/cdn/mobile/home/${sexId}/${categoryId}.jpg`} alt={title}/>
        <div className={styles.title}>
          {/*<Title title={title}/>*/}
        </div>
        <Link
          className={styles.link}
          onClick={() => setCategoriesEv({ sexId, value: categoryId })}
          to={`/products/${sexIdToStr(sexId)}?categories=${categoryId}`}/>
      </div>
    </div>
  )
}
