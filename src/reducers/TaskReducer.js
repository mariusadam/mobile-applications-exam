import {
  TASKS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  isLoading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS_FETCH_SUCCESS:
      return {list: action.payload, isLoading: false};
    default:
      return state;
  }
};