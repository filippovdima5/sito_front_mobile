import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ProductsList, ControlProducts, LoadMore, Filters } from '../../features/products'
import styles from './styles.module.scss'
import { initRouteHistory } from './store'



export class Products extends React.Component<RouteComponentProps<{ sex: string }, { hilocation: string, statusCode?: number }>, any> {
  componentDidMount(): void {
    initRouteHistory(this.props.history)
  }

  componentDidUpdate(prevProps: Readonly<RouteComponentProps<{ sex: string }, { hilocation: string, statusCode?: number }>>): void {
    if (prevProps.match.params.sex !== this.props.match.params.sex){
      initRouteHistory(this.props.history)
    }
  }

  render(){
    return (
      <>
        <div id = "Products" className={styles.Products}>
          <ControlProducts/>
          <ProductsList/>
          <LoadMore/>
        </div>
        <Filters sexId = {this.props.match.params.sex === 'men' ? 1 : 2}/>
      </>
    )
  }
}
