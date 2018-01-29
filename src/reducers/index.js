import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import TaskReducer from './TaskReducer';
import TaskFormReducer from './TaskFormReducer';
import TaskSelectionReducer from './TaskSelectionReducer';

export default combineReducers({
  auth: AuthReducer,
  tasks: TaskReducer,
  taskForm: TaskFormReducer,
  selectedTaskId: TaskSelectionReducer,
});