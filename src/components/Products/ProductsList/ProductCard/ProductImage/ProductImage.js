import React, {Fragment, useState, useEffect, useRef} from 'react';
import styles from './ProductImage.module.scss';
import {Skeleton} from "../../../../../1.atoms/Skeleton/Skeleton";


function ProductImage({src, alt, wrapHeight}) {
    const imgRef = useRef(null);
    const imgHeightRef = useRef(0);

    const [loadedImage, setLoadImg] = useState(false);
    const [heightSpace, setHeightSpace] = useState(0);

    const handleLoadImg = () => setLoadImg(true);

    useEffect(() => {
        if (loadedImage) imgHeightRef.current = imgRef.current.clientHeight
    }, [loadedImage]);

    useEffect(() => {
        if (loadedImage) {
            if ((wrapHeight.current.clientHeight + 50 - imgRef.current.clientHeight) > 0) { // 50 - размер margin в wrapImg в стилях (57px)
                setHeightSpace(wrapHeight.current.clientHeight + 50 - imgRef.current.clientHeight)
            }
        }
    }, [loadedImage, wrapHeight]);

    // const handleTestLoad = () => {
    //     setTimeout(() => (setLoadImg(true)), 1500)
    // };

    return (
       <Fragment>
           <div style={{height: `${heightSpace}px`}}/>

           <img
               ref = {imgRef}
               style={{display: loadedImage ? 'block' : 'none'}}
               className={styles.ProductImage}
               src={src}
               alt={alt}
               onLoad={handleLoadImg}
           />

           {!loadedImage && <Skeleton customStyle={{paddingBottom: 'calc(125% + 30px)'}}/>}

       </Fragment>
    )
}

export {ProductImage}

// TODO: Сделать планое исчесновение скелетона, и плавное появление изображения