import _ from 'lodash';
import React, {Component} from 'react';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import {tasksFetch} from '../actions';
import Task from '../model/Task';
import {Spinner} from './common';

class TaskList extends Component {
  componentWillMount() {
    console.log('Calling tasks fetch');

    this.props.tasksFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({list}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(list);
  }

  static renderRow(task) {
    return <ListItem task={task}/>;
  }

  render() {
    console.log('Rendering task list');

    if (this.props.isLoading) {
      console.log('Showing the loader');
      return <Spinner size={'large'}/>;
    }

    return (
        <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={TaskList.renderRow}
        />
    );
  }
}

const mapStateToProps = state => {
  const {list, isLoading} = state.tasks;
  const mappedList = _.map(list, (val, id) => {
    return Task.unserialize({...val, id});
  });

  return {list: mappedList, isLoading};
};

export default connect(mapStateToProps, {tasksFetch})(TaskList);