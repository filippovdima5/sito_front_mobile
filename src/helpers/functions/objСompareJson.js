const sortObj = function sortAndStringify(obj){
    return (
        Object.fromEntries(
            Object.entries(obj).sort((a, b) => (a[0] - b[0]))
        )
    )
};


export function objCompareJson(obj1, obj2) {
    return (JSON.stringify(sortObj(obj1)) === JSON.stringify(sortObj(obj2)))
}