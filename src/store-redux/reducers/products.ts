import { constants } from '../constants'

const initialState = {
  // decode URL path results
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case constants.SET_PRODUCTS_REDUX_STORE: {
      return { ...state, ...action.payload }
    }
    default: {
      return state
    }
  }
}