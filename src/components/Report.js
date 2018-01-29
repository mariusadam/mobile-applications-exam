import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardSection, Spinner} from './common';
import {Text, View} from 'react-native';
import {reportFetch} from '../actions';

class Report extends Component {

  componentWillMount() {
    this.props.reportFetch(this.props.location);
  }

  render() {
    console.log('Reporrrrrrt', this.props.reports);


    if (this.props.fetchingReports) {
      return <Spinner size={'large'}/>;
    }

    if (this.props.reportsError) {
      return (
          <View>
            <Text style={{color: 'red'}}>{this.props.reportsError}</Text>
          </View>
      );
    }

    return (
        <Card>
          <CardSection>
            <Text>{this.props.reports}</Text>
          </CardSection>
        </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const {reports, reportsError, fetchingReports, location} = state.homepage;

  return {reports, reportsError, fetchingReports, location};
};

export default connect(mapStateToProps, {reportFetch})(Report);