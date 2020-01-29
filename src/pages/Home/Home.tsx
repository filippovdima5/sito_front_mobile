import React from 'react'
import { Slider } from '../../components/Home/Slider/Slider'
import styles from './Home.module.scss'

// todo: за границами слайдера сделать полупроз

const data1Slider = [
  {
    title: 'Одежда',
    url: 'https://sito.store/static/media/event_cross.c3f910a6.jpg',
    img: 'https://sito.store/static/media/event_cross.c3f910a6.jpg',
  }
]

const data1Slider2 = [
  {
    title: 'Бренды',
    url: 'https://sito.store/static/media/event_short.05bde8ac.jpg',
    img: 'https://sito.store/static/media/event_short.05bde8ac.jpg',
  },
]

const data1Slider3 = [
  {
    title: 'Обувь',
    url: 'https://sito.store/static/media/event_last.b17a6581.jpg',
    img: 'https://sito.store/static/media/event_last.b17a6581.jpg',
  },
]

const data1Slider4 = [
  {
    title: 'Магазины',
    url: 'https://sito.store/static/media/event_cross.c3f910a6.jpg',
    img: 'https://sito.store/static/media/event_cross.c3f910a6.jpg',
  }
]

const data1Slider5 = [
  {
    title: 'Товары',
    url: 'https://sito.store/static/media/event_cross.c3f910a6.jpg',
    img: 'https://sito.store/static/media/event_cross.c3f910a6.jpg',
  }
]

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.wrap}>


        <Slider
          data = {data1Slider}
          ratio={'60%'}
        />

        <Slider
          data = {data1Slider3}
          ratio={'15%'}
        />

        <Slider
          data = {data1Slider2}
          ratio={'60%'}
        />

        <Slider
          data = {data1Slider4}
          ratio={'30%'}
        />


        <Slider
          data = {data1Slider3}
          ratio={'60%'}
        />

        <Slider
          data = {data1Slider5}
          ratio={'40%'}
        />

      </div>
    </div>
  )
}

export { Home }