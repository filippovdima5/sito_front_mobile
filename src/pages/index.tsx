import React from 'react'
import { Switch, Route } from 'react-router'
import { Home } from './Home/Home'
import { Products } from './Products/Products'


function Brands() {return(<div>Brands</div>)}
function AboutUs() {return(<div>About us</div>)}


function Pages() {
  return (
    <Switch>
      <Route exact={true} path={'/'} component={Home}/>
      <Route path={'/products/:sex?'} component={Products}/>
      <Route path = {'/brands'} component={Brands}/>
      <Route path={'/about'} component={AboutUs}/>
    </Switch>
  )
}



export {Pages }