import React from 'react'
import { RouteComponentProps } from 'react-router'
import { setCurrentRoute } from '../../stores/env'
import { ProductsList, ControlProducts, LoadMore, Filters } from '../../features/products'
import styles from './styles.module.scss'
import { initRouteHistory, toggleSex } from './store'
import { sexStrToId } from '../../helpers/lib'


export class Products extends React.Component<RouteComponentProps<{ sex: 'men' | 'women' }, { hilocation: string, statusCode?: number }>, any> {
  componentDidMount(): void {
    initRouteHistory(this.props.history)
    setCurrentRoute('/products/')
  }
  
  componentDidUpdate(prevProps: Readonly<RouteComponentProps<{ sex: "men" | "women" }, { hilocation: string; statusCode?: number }>>, prevState: Readonly<any>, snapshot?: any): void {
    if (prevProps.match.params.sex !== this.props.match.params.sex) toggleSex(sexStrToId(this.props.match.params.sex))
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
