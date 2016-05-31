import React, { Component } from 'react';
import DynamicComponent from '../DynamicComponent';

class ProductInfo extends Component {
  render() {
    return (<DynamicComponent product={this.props.product} template='file://views/productInfo'/>);
  }
}

module.exports = ProductInfo;
