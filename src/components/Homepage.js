import React, {Component} from 'react';
import {Button, Card, CardSection, Input, Spinner} from './common';
import {
  locationChanged,
  textChanged,
  quantityChanged,
  reportCreate,
} from '../actions';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import ProductList from './ProductList';

class Homepage extends Component {
  render() {
    return (
        <View>
          <Card>
            <CardSection>
              <Input
                  value={this.props.location}
                  label={'Location'}
                  placeholder={'hala 1'}
                  onChangeText={this.props.locationChanged}
              />
            </CardSection>

            <CardSection>
              <Input
                  value={this.props.text}
                  label={'Text'}
                  placeholder={'abc...'}
                  onChangeText={this.props.textChanged}
              />
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Input
                  value={this.props.quantity}
                  label={'Quantity'}
                  placeholder={'1'}
                  onChangeText={this.props.quantityChanged}
              />
            </CardSection>

            {this.renderError()}

            <CardSection>
              {this.renderSubmitButton()}
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <ProductList/>
            </CardSection>
          </Card>
        </View>
    );
  }

  renderSubmitButton() {
    if (this.props.isSubmitting) {
      return (
          <Spinner size={'large'}/>
      );
    }

    return (
        <Button
            onPress={() => {
              const {location, quantity, selectedProductCode} = this.props;
              this.props.reportCreate({
                code: selectedProductCode,
                location,
                quantity,
              });
            }}
        >
          Submit
        </Button>
    );
  }

  renderError() {
    if (this.props.submitError) {
      return (
          <CardSection>
            <Text style={{color: 'red'}}>{this.props.submitError}</Text>
          </CardSection>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const {location, text, isSubmitting, submitError, quantity} = state.homepage;
  const selectedProductCode = state.selectedProductCode;

  return {
    location,
    text,
    isSubmitting,
    submitError,
    quantity,
    selectedProductCode,
  };
};

export default connect(mapStateToProps, {
  locationChanged, textChanged, quantityChanged, reportCreate,
})(Homepage);