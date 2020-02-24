//import { constants } from '../constants'

const initialState = {
  products: [],
  info: {
    total: 0,
    total_pages: 0
  }
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case 'SET_PRODUCTS_REDUX_STORE': {
      return { ...state, ...action.payload }
    }
    default: {
      return state
    }
  }
}