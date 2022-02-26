import * as redux from "redux";

import { cartReducer } from "./reducers/cartReducer";

// Root Reducer
const rootReducer = redux.combineReducers({
  cart: cartReducer
});

// Store
export const store = redux.createStore(rootReducer);
