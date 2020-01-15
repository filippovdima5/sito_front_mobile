import React, { useRef, useEffect } from 'react';
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
    const {history: {push, action}} = useRouter();
    const pushUrl = useRef(push).current;
    const $params = useStore(params);



    const actionRef = useRef('');

    useEffect(() => {actionRef.current = action}, [action]);

    useUpdateEffect(() => {
        console.log(actionRef)
         if (actionRef.current !== 'PUSH') pushUrl(createUrl($params), {sex_id, ...$params})
    }, [ $params ]);


});

export {Push}