import React from 'react'
import { RouteComponentProps } from 'react-router'
import styles from './styles.module.scss'
import { initRouteHistory } from './store'

// import { ControlProducts } from '../../components/Products/ControlProducts'
// import { ProductsList } from '../../components/Products/ProductsList/ProductsList'
// import { LoadMore } from '../../components/Products/LoadMore/LoadMore'
// import { FiltersList } from '../../components/Products/FiltersList/animate/FiltersListAnimate'





export class Products extends React.Component<RouteComponentProps<{ sex: string }, { hilocation: string, statusCode?: number }>> {
  componentDidMount(): void {
    initRouteHistory(this.props.history)
  }

  render(){
    return (
      <>
        <div id = "Products" className={styles.Products}>
          {/*<ControlProducts/>*/}
          {/*<ProductsList/>*/}
          {/*<LoadMore/>*/}
        </div>

        {/*<FiltersList/>*/}
      </>
    )
  }
}
