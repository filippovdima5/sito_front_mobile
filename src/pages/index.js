import React from 'react';

import {Home} from "./Home/Home";
import {Products} from "./Products/Products";

import {Switch, Route} from "react-router";


function Pages() {
    return (
        <Switch>
            <Route exact={true} path={'/'} component={Home}/>
            <Route path={'/products/:sex?'} component={Products}/>
        </Switch>
    )
}

export {Pages}