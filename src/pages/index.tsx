import React from 'react'
import { Switch, Route } from 'react-router'
import { Home } from './home'
import { Products } from './products'


function Brands() {return(<div>Brands</div>)}
function AboutUs() {return(<div>About us</div>)}
function NotFound() {return <div>Not Found 404</div>}


function Pages() {
  return (
    <Switch>
      <Route exact={true} path={'/'} component={Home}/>
      <Route path={'/products/:sex'} component={Products}/>

      <Route path = {'/brands'} component={Brands}/>
      <Route path={'/about'} component={AboutUs}/>


      <Route path={'*'} component={NotFound}/>
    </Switch>
  )
}



export {Pages }