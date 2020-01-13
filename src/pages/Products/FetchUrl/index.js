import React, {Fragment} from 'react';
import {Push} from "./Push";
import {Fetch} from "./Fetch";

const FetchUrl = React.memo(() => {
    return (
        <Fragment>
            <Push/>
            <Fetch/>
        </Fragment>
    )
});

export {FetchUrl}