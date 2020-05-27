function cssGateways(sh1, sh2, v1, v2) {
    const m = (sh2 - sh1)/(v2 - v1)
    const b = sh1 - m * v1

    return JSON.stringify({
        1: `${sh1}  ( ${v1}px )`,
        2: `calc(${m * 100}vw ${b < 0 ? '-' : '+'} ${Math.abs(b)}px)`,
        3: `${sh2} ( ${v2} )`,
        4: '',
        info1: `@media (max-width: ${v1}px) { }`,
        info2: `@media (max-width: ${v2}px) { }`,
        info3: `@media (min-width: ${v1}px) { }`,
        info4: `@media (min-width: ${v2}px) { }`
    }, null, 2)
}

console.log(
    cssGateways(12, 16, 320, 450)
)
