import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ProductsList, ControlProducts } from '../../features/products'
import styles from './styles.module.scss'
import { initRouteHistory } from './store'


// import { LoadMore } from '../../components/Products/LoadMore/LoadMore'
// import { FiltersList } from '../../components/Products/FiltersList/animate/FiltersListAnimate'





export class Products extends React.Component<RouteComponentProps<{ sex: string }, { hilocation: string, statusCode?: number }>> {
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


          {/*<ControlProducts/>*/}
          {/*<ProductsList/>*/}
          {/*<LoadMore/>*/}
        </div>

        {/*<FiltersList/>*/}
      </>
    )
  }
}
