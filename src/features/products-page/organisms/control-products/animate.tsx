import React, {  useState, useEffect, useRef, useCallback } from 'react'
import config from '../../../../config'
import { ControlProducts } from './control-products'



const getScrollTop = () => config.ssr ? 0 : window.scrollY


export const Animate = () => {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndX = useRef(0)
  const touchEndY = useRef(0)
  const touchStartTime = useRef(Date.now())
  const blockTouches = useRef(true)
  const [show, setShow] = useState(true)
  
  const handleScroll = useCallback(() => {
    const top = getScrollTop()
    if (top <= 100) {
      blockTouches.current = true
      setShow(true)
      return
    }
    blockTouches.current = false
  }, [])
  
  const handleStartTouch = useCallback((e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
    touchStartY.current = e.changedTouches[0].screenY
    touchStartTime.current = Date.now()
  }, [])
  
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (blockTouches.current) return
    
    const now = Date.now()
    if (now - touchStartTime.current > 500) return
    
    touchEndX.current = e.changedTouches[0].screenX
    touchEndY.current = e.changedTouches[0].screenY
    
    const xDelta = Math.abs(touchEndX.current - touchStartX.current)
    const yDelta = Math.abs(touchEndY.current - touchStartY.current)
    
    const vertical = yDelta > 20 && xDelta < 100
    if (!vertical) return
    
    setShow(touchEndY.current - touchStartY.current > 0)
  }, [])
  

  useEffect(() => {
    document.addEventListener('touchstart', handleStartTouch)
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('scroll', handleScroll)
    
    return () => {
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('touchstart', handleStartTouch)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [ handleStartTouch, handleTouchEnd, handleScroll ])
  

  return <ControlProducts unShow={!show}/>
}


