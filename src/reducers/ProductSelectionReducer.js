import {
  PRODUCT_SELECTED,
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case PRODUCT_SELECTED:
      return action.payload;
    default:
      return state;
  }
};