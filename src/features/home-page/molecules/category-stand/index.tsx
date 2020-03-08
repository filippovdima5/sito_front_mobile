import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../../atoms/title'
import styles from './styles.module.scss'
import { namesCategory } from '../../../../constants/category-keys'
import { sexIdToStr } from '../../../../helpers/lib'
import { setCategories } from '../../../products-page/features/filters/store'
import { useEvent } from 'effector-react/ssr'


// todo: Потом что то подобное должно хранится у юзера
const category = {
  1: [ 1001, 2005, 3001 ],
  2: [ 1002, 2004, 3002 ]
} as const


type Props = {
  sexId: 1 | 2,
  height: number,
  index: 0 | 1 | 2,
}

export function CategoryStand({ height, sexId, index }: Props) {
  const setCategoriesEv = useEvent(setCategories)
  
  const categoryId = useMemo(() => {
    return category[sexId][index]
  }, [sexId, index])
  
  const title = useMemo(() => {
    return namesCategory[sexId][categoryId]
  }, [ categoryId, sexId ])
  
  
  return (
    <div>
      <div style={{ paddingTop: `${height}%` }} className={styles.wrap}>
        <img className={styles.img} src={'/'} alt={title}/>
        <div className={styles.title}>
          <Title title={title}/>
        </div>
        <Link
          className={styles.link}
          onClick={() => setCategoriesEv({ sexId, value: categoryId })}
          to={`/products/${sexIdToStr(sexId)}?categories=${categoryId}`}/>
      </div>
    </div>
  )
}