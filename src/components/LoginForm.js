import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from '../actions';
import {Button, Card, CardSection, Input, Spinner} from './common';

class LoginForm extends Component {
  componentDidMount() {
    this.props.emailChanged('marius.adam134@gmail.com');
    this.props.passwordChanged('abcd1234');
  }

  onButtonPress() {
    const {email, password} = this.props;

    this.props.loginUser({email, password});
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size={'large'}/>;
    }

    return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Login
        </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
          <CardSection style={styles.errorSectionStyle}>
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
          </CardSection>
      );
    }
  }

  render() {
    console.log('LoginForm render');

    return (
        <View style={styles.loginViewStyle}>
          <Card>
            <CardSection>
              <Input
                  value={this.props.email}
                  label={'Email'}
                  placeholder={'email@gmail.com'}
                  onChangeText={this.props.emailChanged}
              />
            </CardSection>

            <CardSection>
              <Input
                  value={this.props.password}
                  secureTextEntry
                  label={'Password'}
                  placeholder={'password'}
                  onChangeText={this.props.passwordChanged}
              />
            </CardSection>

            {this.renderError()}

            <CardSection>
              {this.renderButton()}
            </CardSection>
          </Card>
        </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    paddingLeft: 20,
  },
  loginViewStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  errorSectionStyle: {
    padding: 20
  }
};

const mapStateToProps = ({auth}) => {
  const {email, password, error, loading} = auth;

  return {email, password, error, loading};
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser,
})(LoginForm);