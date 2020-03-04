import React, { useRef } from 'react'
import { ShortProduct } from '../../../api/types'
import { ProductImage } from '../product-image/ProductImage'
import styles from './styles.module.scss'





export function ProductCard({ id, brand, img, oldprice, price, sale, title, url }: ShortProduct) {
  const wrapImgRef = useRef(null)
  
  return (
    <div className={styles.card}>
      <div>

        <div ref={wrapImgRef} className={styles.wrapImg}>
          <span>
            <ProductImage
              wrapHeight = {wrapImgRef}
              src={img[0]}
              alt={title}
            />
          </span>
        </div>

        <div className={styles.footer}>
          <div className={styles.brand}>{brand}</div>
          <div className={styles.title}>{title}</div>

          <div className={styles.cost}>
            <del className={styles.old_price}>{oldprice}</del>
            <span className={styles.price}>{price}</span>
          </div>

          <div className={styles.sale}>{sale}</div>
        </div>

      </div>
    </div>
  )
}