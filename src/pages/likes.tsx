import React from 'react'
import { START } from 'lib/effector';
import { $loadLikeProducts } from '../features/likes-page/store'
import { LikesPage } from '../features/likes-page'

export function Likes() {
  return(
    <LikesPage/>
  )
}


Likes[START] = $loadLikeProducts