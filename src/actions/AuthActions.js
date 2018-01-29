import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});
    firebase.auth().
        signInWithEmailAndPassword(email, password).
        then(user => loginUserSuccess(dispatch, user)).
        catch(error => {
          console.log('Login error', error);
          console.log('Trying to register user', email);

          firebase.auth().
              createUserWithEmailAndPassword(email, password).
              then(user => loginUserSuccess(dispatch, user)).
              catch(error => loginUserFail(dispatch, error));
        });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });

  Actions.main();
};

const loginUserFail = (dispatch, error) => {
  console.log('Login failed', error);

  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error.message,
  });
};