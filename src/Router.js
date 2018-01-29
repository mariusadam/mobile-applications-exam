import React from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PopularReddits from './components/PopularReddits';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';

export default RouterComponent = () => (
    <Router>
      <Scene key={'root'} hideNavBar>
        <Scene key={'auth'}>
          <Scene key={'login'} component={LoginForm} title={'Login'}/>
        </Scene>

        <Scene key={'main'}>
          {/*<Scene key={'popularReddits'} component={PopularReddits} title={'Popular reddits'}/>*/}

          <Scene
            onRight={() => Actions.taskCreate()}
            rightTitle={"Add"}
            key={"taskList"}
            component={TaskList}
            title={"Tasks"}
            initial
          />
          <Scene key={'taskCreate'} component={TaskCreate} title={'Create task'}/>
          <Scene key={'taskEdit'} component={TaskEdit} title={'Edit task'}/>

        </Scene>
      </Scene>
    </Router>
);