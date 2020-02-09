import React from 'react'
import styles from './styles.module.scss'


const data: any = []
for (let i = 0; i < 20; i++){
  data.push('https://sito.store/static/media/Lacoste.9109d412.png')
}

export function ScrollSlider() {
  return (
    <div className={styles.wrap}>
      <div className={styles.preWrap}>

        {data.map((i: string) => (
          <div className={styles.item} key={i}>
            <img  className = {styles.img} alt={''} src={i}/>
          </div>
        ))}
      </div>
    </div>
  )
}