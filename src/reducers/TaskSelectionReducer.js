import {
  TASK_SELECTED,
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case TASK_SELECTED:
      return action.payload;
    default:
      return state;
  }
};