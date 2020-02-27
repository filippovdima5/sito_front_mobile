import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ProductsList, ControlProducts, LoadMore, Filters } from '../../features/products'
import styles from './styles.module.scss'
import { initRouteHistory } from './store'


export class Products extends React.Component<RouteComponentProps<{ sex: string }, { hilocation: string, statusCode?: number }>, any> {
  componentDidMount(): void {
    initRouteHistory(this.props.history)
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
