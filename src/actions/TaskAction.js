import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
  TASKS_FETCH_SUCCESS,
  TASK_CREATE,
  TASK_SAVE_SUCCESS,
  TASK_SELECTED,
  TASK_UPDATE, TASK_CREATE_SUCCESS, TASK_SAVE,
} from './types';

export const taskUpdate = ({prop, value}) => {
  return {
    type: TASK_UPDATE,
    payload: {prop, value},
  };
};

export const taskCreate = (task) => {
  const {currentUser} = firebase.auth();
  console.log('Creating task ', task.serialize());

  return (dispatch) => {
    dispatch({type: TASK_CREATE});

    firebase.database().
        ref(`/users/${currentUser.uid}/tasks`).
        push(task.serialize()).
        then(() => {
          dispatch({type: TASK_CREATE_SUCCESS});
          Actions.main({type: 'reset'});
        });
  };
};

export const tasksFetch = () => {
  console.log('Fetching tasks from server');

  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/tasks`).
        on('value', snapshot => {
          dispatch({
            type: TASKS_FETCH_SUCCESS,
            payload: snapshot.val(),
          });
        });
  };
};

export const taskSelected = (taskId) => {
  console.log('Selecting task', taskId);
  return {
    type: TASK_SELECTED,
    payload: taskId,
  };
};

export const taskDelete = (task) => {
  const {currentUser} = firebase.auth();

  return () => {
    firebase.database().
        ref(`/users/${currentUser.uid}/tasks/${task.id}`).
        remove().
        then(() => {
          console.log('Task deleted:', task);
        });
  };
};

export const taskSave = (task) => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    dispatch({type: TASK_SAVE});

    firebase.database().
        ref(`/users/${currentUser.uid}/tasks/${task.id}`).
        set(task.serialize()).
        then(() => {
          dispatch({type: TASK_SAVE_SUCCESS});
          Actions.main({type: 'reset'});
        });
  };
};