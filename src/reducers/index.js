import {combineReducers} from 'redux';
import ProductSelectionReducer from './ProductSelectionReducer';
import HomepageReducer from './HomepageReducer';

export default combineReducers({
  homepage: HomepageReducer,
  selectedProductCode: ProductSelectionReducer
});