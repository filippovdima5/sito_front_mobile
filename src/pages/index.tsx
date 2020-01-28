import React from 'react'

import { Switch, Route } from 'react-router'
import { Home } from './Home/Home'
import { Products } from './Products/Products'



function Pages() {
  return (
    <Switch>
      <Route exact={true} path={'/'} component={Home}/>
      <Route path={'/products/:sex?/:subcategory?'} component={Products}/>
    </Switch>
  )
}

export { Pages }