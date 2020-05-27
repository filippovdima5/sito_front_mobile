import React from 'react'
import { SkeletonCard } from '../../../commons/organisms/product-card'


export function LoadingList({ count }: { count: number }) {
  return (
    <>
      { Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index}/>
      )) }
    </>
  )
}
