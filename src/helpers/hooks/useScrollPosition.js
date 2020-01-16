import { useRef, useLayoutEffect, useCallback } from 'react'

function getScrollPosition() {
    const position = document.body.getBoundingClientRect();
    return { y: position.top }
}

export function useScrollPosition(effect, element) {
    const position = useRef(getScrollPosition()); // текущая позиция
    const isThrottled = useRef(false); // в режимие игнорирования
    const savedTimer = useRef(0); // Последний таймер

    const delay = 200;
    //const testDate = useRef(Date.now());

    const callBack = useCallback(() => {
        const currPos =  getScrollPosition();
        effect({ prevPos: position.current, currPos });
        position.current = currPos;
    }, [effect]);

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (!isThrottled.current) { // Если НЕ стоит на паузе
                //console.log('active', (Date.now() - testDate.current)/1000);
                isThrottled.current = true; // Ставим в режим ожидания
                callBack();
                setTimeout(() => {
                    isThrottled.current = false // Снимаем с паузы
                }, delay);
            }
            else {
                clearTimeout(savedTimer.current);
                savedTimer.current = setTimeout(() => {
                    //console.log('timeout', (Date.now() - testDate.current)/1000);
                    callBack();
                    isThrottled.current = false; // Снимаем с паузы
                }, delay);
            }
        };

        document.body.addEventListener('scroll', handleScroll);
        return () => document.body.removeEventListener('scroll', handleScroll)
    }, [callBack])
}