import React, {Component} from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
  LayoutAnimation,
  Alert,
} from 'react-native';
import {Button, CardSection, Confirm} from './common';
import {connect} from 'react-redux';
import {taskSelected, taskDelete} from '../actions';
import {Actions} from 'react-native-router-flux';

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const {title, id} = this.props.task;

    console.log('Render task ', title);
    return (
        <CardSection style={{flexDirection: 'column'}}>
          <View style={styles.previewContainerStyle}>
            <TouchableWithoutFeedback
                onPress={
                  () => this.props.taskSelected(
                      this.props.expanded ? null : id) //toggle expansion
                }
            >
              <View style={{flex: 4}}>
                <Text style={styles.titleStyle}>{title}</Text>
              </View>
            </TouchableWithoutFeedback>
            <Button
                onPress={this.onEditButtonPress.bind(this)}
            >
              Edit
            </Button>
            <Button
                buttonStyle={styles.deleteButtonStyle}
                textStyle={styles.deleteTextStyle}
                onPress={this.onDeleteButtonPress.bind(this)}
            >
              Delete
            </Button>
          </View>
          {this.renderDetails()}
        </CardSection>
    );
  }

  onEditButtonPress() {
    Actions.taskEdit({initialTask: this.props.task});
  }

  onDeleteButtonPress() {
    Alert.alert(
        'Confirm delete',
        'Are you sure you want to delete this task?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              this.props.taskDelete(this.props.task);
            },
          },
        ],
        {cancelable: true},
    );
  }

  renderDetails() {
    const {task, expanded} = this.props;

    if (expanded) {
      return (
          <View style={styles.detailsContainerStyle}>
            <CardSection>
              <Text>Status: </Text>
              <Text>{task.statusLabel()}</Text>
            </CardSection>
            <CardSection>
              <Text>Deadline: </Text>
              <Text>{task.formattedDate()}</Text>
            </CardSection>
          </View>
      );
    }
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
  detailsContainerStyle: {
    paddingLeft: 30,
  },
  previewContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteTextStyle: {
    color: '#ff472e',
  },
  deleteButtonStyle: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ff472e',
  },
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedTaskId === ownProps.task.id;

  return {expanded};
};

export default connect(mapStateToProps, {
  taskSelected, taskDelete,
})(ListItem);