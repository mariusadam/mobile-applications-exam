import {
  TASK_CREATE,
  TASK_UPDATE,
  TASK_SAVE,
  TASK_SAVE_SUCCESS, TASK_CREATE_SUCCESS,
} from '../actions/types';
import Task from '../model/Task';

const INITIAL_STATE = {
  task: Task.empty(),
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASK_CREATE:
      return {...state, isLoading: true};
    case TASK_CREATE_SUCCESS:
      return INITIAL_STATE;
    case TASK_UPDATE:
      const {task} = state;
      return {...state, task: task.withProp(action.payload)};
    case TASK_SAVE:
      return {...state, isLoading: true};
    case TASK_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};