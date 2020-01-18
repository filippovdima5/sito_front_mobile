export const parseSearch =  (search) => {
    if (!search) return {};
    return Object.fromEntries(
        decodeURI(search)
            .split('?')[1]
            .split('&')
            .map(item => (item.split('=')))
            .map(([key, value]) => (
                [key, value.split('|')
                    .map(value => ((+value) ? +value : value))]
            ))
    )
};