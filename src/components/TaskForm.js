import React, {Component} from 'react';
import {View, Text, Picker, DatePickerAndroid} from 'react-native';
import {connect} from 'react-redux';
import {Button, CardSection, Input, Spinner} from './common';
import {taskUpdate} from '../actions';
import Task from '../model/Task';
import _ from 'lodash';

class TaskForm extends Component {
  render() {
    const {task} = this.props;
    console.log(task);

    const dateButtonLabel = 'Deadline: ' + task.formattedDate();
    return (
        <View>
          <CardSection>
            <Input
                label={'Title'}
                placeholder={'Title'}
                value={task.title}
                onChangeText={
                  value => this.props.taskUpdate({prop: 'title', value})
                }
            />
          </CardSection>

          <CardSection>
            <View style={styles.containerStyle}>
              <Text style={styles.pickerLabelStyle}>Status</Text>
              <Picker
                  style={styles.pickerStyle}
                  selectedValue={task.status}
                  onValueChange={
                    (value) => this.props.taskUpdate({prop: 'status', value})
                  }
              >
                {TaskForm.renderStatuses()}
              </Picker>
            </View>
          </CardSection>

          <CardSection>
            <Button onPress={this.onChooseDatePress.bind(this)}>
              {dateButtonLabel}
            </Button>
          </CardSection>
        </View>
    );
  }

  static renderStatuses() {
    return _.map(
        Task.statusesMap(),
        function(label, key) {
          return <Picker.Item key={key} label={label} value={key}/>;
        },
    );
  }

  onChooseDatePress() {
    DatePickerAndroid.open({
      date: this.props.deadlineDate,
      minDate: new Date(),
    }).then(({action, year, month, day}) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        const value = new Date(year, month, day);
        console.log('Choose date', value);
        this.props.taskUpdate({prop: 'deadlineDate', value});
      }
    }).catch(({code, message}) => {
      console.log('Failed to open date picker', code, message);
    });
  }
}

const styles = {
  pickerStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    flex: 2,
  },
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const mapStateToProps = (state) => {
  console.log('This is the form state', state.taskForm);
  const {task} = state.taskForm;

  return {task};
};

export default connect(mapStateToProps, {taskUpdate})(TaskForm);