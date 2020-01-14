import React, { useRef } from 'react';
import {useUpdateEffect} from "react-use";
import useRouter from "use-react-router";
import {useStore} from "effector-react";
import {params} from "./fetchStore";


const sex_id = 1;

const createUrl = (params) => {
    return(
        '/products/men?' +
    Object.entries(params)
        .map(([key, value])=>(
            `${key}=${value
                .join('|')}`
        ))
        .join('&')
    )
};

const Push = React.memo(() => {
    const {history: {push}} = useRouter();
    const pushUrl = useRef(push).current;
    const $params = useStore(params);


    const mount = useRef(false);
    useUpdateEffect(() => {
        console.log('PUSH')
        if (mount.current) pushUrl(createUrl($params), {sex_id, ...$params});
        else mount.current = true
    }, [$params])
});

export {Push}