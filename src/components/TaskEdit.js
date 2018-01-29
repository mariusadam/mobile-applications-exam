import React, {Component} from 'react';
import {Button, Card, CardSection, Spinner} from './common';
import {taskUpdate, taskSave} from '../actions';
import {connect} from 'react-redux';
import TaskForm from './TaskForm';
import _ from 'lodash';

class TaskEdit extends Component {
  componentWillMount() {
    console.log('Setting form', this.props.initialTask);

    _.each(this.props.initialTask, (value, prop) => {
      this.props.taskUpdate({prop, value});
    });

    console.log('Updated all initial form properties');
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner size={'large'}/>;
    }

    return (
        <Card>
          <TaskForm task={this.props.task}/>

          <CardSection>
            <Button onPress={this.onSaveButtonPress.bind(this)}>
              Save changes
            </Button>
          </CardSection>
        </Card>
    );
  }

  onSaveButtonPress() {
    this.props.taskSave(this.props.task);
  }
}

const mapStateToProps = (state, ownProps) => {
  const {task, isLoading} = state.taskForm;

  return {task, isLoading};
};

export default connect(mapStateToProps, {
  taskUpdate, taskSave,
})(TaskEdit);