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
import {productSelected} from '../actions';

class ProductListItem extends Component {

  render() {
    console.log('Render product ', this.props.product);

    return (
        <CardSection>
          <TouchableNativeFeedback
              onPress={this.onProductPressed.bind(this)}
          >
            {this.renderText()}
          </TouchableNativeFeedback>
        </CardSection>
    );
  }

  renderText() {
    const {code, description} = this.props.product;

    if (!this.props.selected) {
      return <Text>{description} ({code})</Text>;
    }

    return <Text style={{fontWeight: 'bold'}}>{description} ({code})</Text>;
  }

  onProductPressed() {
    console.log('Pressed on product ' + this.props.product);
    if (this.props.selected) {
      this.props.productSelected({code: null});
    } else {
      this.props.productSelected(this.props.product);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const selected = state.selectedProductCode === ownProps.product.code;

  return {selected};
};

export default connect(mapStateToProps, {
  productSelected,
})(ProductListItem);