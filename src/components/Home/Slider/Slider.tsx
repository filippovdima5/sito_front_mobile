import React from 'react'
import styles from './Slider.module.scss'
import { Slide } from './Slide/Slide'


export type SlideProps = {
  title: string,
  url: string,
  img: string,
  index?: number,
}

type PropsSlider = {
  data: Array<SlideProps>,
  ratio: string,
}

function Slider({ ratio, data }: PropsSlider) {
  return(
    <div style={{ paddingBottom: ratio }} className={styles.Slider}>
      <div className={styles.typeWrap}>
        {data.map(({ title, img, url }, index) => (
          <Slide key = { index } index={index} title={ title } url={ url } img={ img }/>
        ))}
      </div>
    </div>
  )
}

export { Slider }


/// static/media/event_cross.c3f910a6.jpg