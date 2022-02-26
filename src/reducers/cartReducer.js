// Actions
export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const EMPTY = "EMPTY";

// Reducer
export const cartReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ADD: {
      const curVal = [...state.products];
      curVal.push(action.product);
      return { ...state, products: curVal };
    }
    case REMOVE: {
      const curVal = [...state.products];
      curVal.filter((element) => ( element.id!==action.product_id ));
      return { ...state, products: curVal };
    }
    case EMPTY: {
      return { ...state, products: [] };
    }
    default: {
      return state;
    }
  }
};
