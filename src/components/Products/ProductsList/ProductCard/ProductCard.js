import React, {useRef} from 'react';
import styles from './ProductCard.module.scss';
import {Skeleton} from "../../../../1.atoms/Skeleton/Skeleton";
import {ProductImage} from "./ProductImage/ProductImage";

function ProductCard({img, title, brand, oldprice, price, sale}) {
    const wrapImgRef = useRef(null);

    return (
        <div className={styles.ProductCard}>
            <div>

                <div ref={wrapImgRef} className={styles.wrapImg}>
                    <span>
                        {img ?
                            <ProductImage
                                wrapHeight = {wrapImgRef}
                                src={img}
                                alt={title}
                            />
                            :
                            <Skeleton customStyle={{paddingBottom: 'calc(125% + 30px)'}}/>
                        }
                    </span>
                </div>

                <div className={styles.footer}>
                    <div className={styles.brand}>
                        {brand ? brand : <Skeleton customStyle={{height: 14}}/>}
                    </div>

                    <div className={styles.title}>
                        {title ? title : <Skeleton customStyle={{height: 14}}/>}
                    </div>

                    <div className={styles.cost}>
                        <del className={styles.old_price}>
                            {oldprice ? oldprice : <Skeleton customStyle={{height: 14, width: 40}}/>}
                        </del>
                        <span className={styles.price}>
                            {price ? price : <Skeleton customStyle={{height: 14, width: 40}}/>}
                        </span>
                    </div>

                    <div className={styles.sale}>
                        {sale ? `Скидка: ${sale} %` : <Skeleton customStyle={{height: 14}}/>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export {ProductCard}