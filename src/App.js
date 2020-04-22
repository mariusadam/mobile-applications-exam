import React, {Component} from 'react';
import firebase from 'firebase';
import reducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import {Provider} from 'react-redux';
import {UIManager} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental(true);

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
    };

    firebase.initializeApp(config);

    console.ignoredYellowBox = [
      'Setting a timer',
    ];
  }

  render() {
    return (
        <Provider store={store}>
          <Router/>
        </Provider>
    );
  }
}
