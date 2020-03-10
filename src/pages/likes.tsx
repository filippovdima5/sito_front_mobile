import React from 'react'
import { START } from 'lib/effector';
import { $loadLikeProducts } from '../features/likes-page/store'
import { LikesPage } from '../features/likes-page'
import {useBodyScrollTop} from '../helpers/hooks/use-body-scroll-top'

export function Likes() {
  useBodyScrollTop()
  return(
    <LikesPage/>
  )
}


Likes[START] = $loadLikeProducts