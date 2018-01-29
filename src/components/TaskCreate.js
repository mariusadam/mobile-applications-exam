import React, {Component} from 'react';
import {connect} from 'react-redux';
import {taskCreate, taskUpdate} from '../actions';
import TaskForm from './TaskForm';
import {Button, Card, CardSection, Spinner} from './common';

class TaskCreate extends Component {

  onButtonPress() {
    this.props.taskCreate(this.props.task);
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner size={'large'}/>;
    }

    return (
        <Card>
          <TaskForm task={this.props.task}/>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Add task
            </Button>
          </CardSection>
        </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const {task, isLoading} = state.taskForm;

  return {task, isLoading};
};

export default connect(mapStateToProps, {
  taskUpdate, taskCreate,
})(TaskCreate);