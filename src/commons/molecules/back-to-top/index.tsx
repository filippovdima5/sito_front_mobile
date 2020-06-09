import React, { useCallback, useEffect, useRef, useState } from 'react'
import config from '../../../config'
import styles from './styles.module.scss'


const FPS = 3
const getScrollTop = () => config.ssr ? 0 : window.scrollY



const BackToTop: React.FC = () => {
  const touchWindow = useRef(false)
  const frameId = useRef(0)
  const animateIsActive = useRef(false)
  
  const [show, setShow] = useState(false)
  
  
  const scrollToTop = useCallback(() => {
    const top = getScrollTop()
    if (top <= 0 || config.ssr) return
  
    const delta = Math.max(10, top / FPS)
  
    window.scrollTo(0, Math.max(top - delta, 0))
    frameId.current = window.requestAnimationFrame(scrollToTop)
  }, [])

  
  useEffect(() => {
    const handler = () => {
      const top = getScrollTop()
      setShow(top > 250)
      if (top === 0) animateIsActive.current = false
    }
    document.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  
  
  useEffect(() => {
    const cancelScrollToTop = () => {
      touchWindow.current = true
      if (animateIsActive.current && touchWindow.current && frameId.current !== 0) {
        window.cancelAnimationFrame(frameId.current)
      }
      touchWindow.current = false
    }
    
    document.addEventListener('touchstart', cancelScrollToTop)
    return () => {
      document.removeEventListener('touchstart', cancelScrollToTop)
    }
  }, [])
  
  
  if (config.ssr) return null
  return(
    <div>
      <div
        style={{ display: show ? 'block' : 'none' }}
        role="button"
        onClick={() => {
          animateIsActive.current = true
          touchWindow.current = false
          scrollToTop()
        }}
        className={styles.wrap}
      >
        <div className={styles.arrow}/>
      </div>
    </div>
  )
}

export default React.memo(BackToTop)
