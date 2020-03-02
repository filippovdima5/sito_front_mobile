import React from 'react'
import { RouteComponentProps } from 'react-router'
import { setCurrentRoute } from '../../stores/env'
import { ProductsList, ControlProducts, LoadMore, Filters } from '../../features/products'
import styles from './styles.module.scss'
import { initRouteHistory } from './store'


export class Products extends React.Component<RouteComponentProps<{ sex: 'men' | 'women' }, { hilocation: string, statusCode?: number }>, any> {
  componentDidMount(): void {
    initRouteHistory(this.props.history)
    setCurrentRoute('/products/')
  }
  
  
  render(){
    return (
      <>
        <div className={styles.products}>
          <ControlProducts/>
          <ProductsList/>
          <LoadMore/>
        </div>
        <Filters sexId = {this.props.match.params.sex === 'men' ? 1 : 2}/>
      </>
    )
  }
}
