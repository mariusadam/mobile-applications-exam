import React from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
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