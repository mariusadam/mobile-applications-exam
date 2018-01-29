import _ from 'lodash';
import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import ProductListItem from './ProductListItem';
import {productsFetch} from '../actions';
import Task from '../model/Task';
import {Spinner} from './common';

class ProductList extends Component {
  componentWillMount() {
    console.log('Product list has props', this.props);

    setInterval(() => this.fetchProductsHandler(), 3000);

    this.createDataSource(this.props);
  }

  fetchProductsHandler() {
    console.log('Fetching products from server');
    this.props.productsFetch(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({items}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(items);
  }

  static renderRow(product) {
    return <ProductListItem product={product}/>;
  }

  render() {
    console.log('Rendering task list');

    if (this.props.isLoading) {
      console.log('Showing the loader');
      return <Spinner size={'large'}/>;
    }
    if (this.props.error) {
      console.log('Showing the error');
      return (
          <View>
            <Text style={{color: 'red'}}>{this.props.error}</Text>
          </View>
      );
    }

    return (
        <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={ProductList.renderRow}
        />
    );
  }
}

const mapStateToProps = state => {
  console.log('Map state in pr list', state.homepage);

  return state.homepage;
};

export default connect(mapStateToProps, {productsFetch})(ProductList);