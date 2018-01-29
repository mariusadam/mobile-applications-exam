import {
  LOCATION_CHANGED,
  TEXT_CHANGED,
  PRODUCTS_FETCH_FAIL,
  PRODUCTS_FETCH_START,
  PRODUCTS_FETCH_SUCCESS,
  QUANTITY_CHANGED,
  REPORT_CREATE_FAIL,
  REPORT_CREATE_START,
  REPORT_CREATE_SUCCESS,
  REPORT_FETCH_FAIL,
  REPORT_FETCH_START,
  REPORT_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  location: '',
  text: '',
  items: [],
  isLoading: false,
  quantity: null,
  error: '',
  isSubmitting: false,
  submitError: '',
  fetchingReports: false,
  reports: '',
  reportsError: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  console.log(state);

  switch (action.type) {
    case LOCATION_CHANGED:
      return {...state, location: action.payload};
    case TEXT_CHANGED:
      return {...state, text: action.payload};
    case PRODUCTS_FETCH_START:
      return {...state, isLoading: true, error: ''};
    case PRODUCTS_FETCH_FAIL:
      return {...state, isLoading: false, error: action.payload};
    case PRODUCTS_FETCH_SUCCESS:
      return {...state, isLoading: false, ...action.payload, error: ''};
    case QUANTITY_CHANGED:
      return {...state, quantity: action.payload};
    case REPORT_CREATE_FAIL:
      return {...state, submitError: action.payload, isSubmitting: false};
    case REPORT_CREATE_START:
      return {...state, submitError: '', isSubmitting: true};
    case REPORT_CREATE_SUCCESS:
      return {...state, submitError: '', isSubmitting: false};
    case REPORT_FETCH_START:
      return {...state, fetchingReports: true, reports: ''};
    case REPORT_FETCH_FAIL:
      return {
        ...state,
        fetchingReports: false,
        reportsError: action.payload,
        reports: '',
      };
    case REPORT_FETCH_SUCCESS:
      return {
        ...state,
        fetchingReports: false,
        reportsError: '',
        reports: action.payload,
      };
    default:
      return state;
  }
};