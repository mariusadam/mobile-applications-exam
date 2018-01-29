import React from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PopularReddits from './components/PopularReddits';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';
import Homepage from './components/Homepage';
import Report from './components/Report';

export default RouterComponent = () => (
    <Router>
      <Scene key={'root'}
             onRight={() => Actions.report()}
             rightTitle={'Report'}
             title={'Inventory'}
      >
        <Scene key={'homepage'} component={Homepage} title={'Homepage'}/>
        <Scene key={'report'} component={Report} title={'Reports'}/>
      </Scene>
    </Router>
);