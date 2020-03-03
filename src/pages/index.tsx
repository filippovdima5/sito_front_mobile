import React from 'react'
import { Switch, Route } from 'react-router'
import { Home } from './home'
import { Products } from './products'
import { NotFound } from './not-found'
import { BrandsPage } from '../features/brands-page'


export function Pages() {
  return (
    <Switch>
      <Route exact={true} path={'/'} component={Home}/>
      <Route exact={true} path={'/home/:sex?'} component={Home}/>
      <Route path={'/products/:sex'} component={Products}/>
      <Route path={'/brands/:sex?'} component={BrandsPage}/>


      
      
      <Route path={'/404'} component={NotFound}/>
      <Route path={'*'} component={NotFound}/>
    </Switch>
  )
}
