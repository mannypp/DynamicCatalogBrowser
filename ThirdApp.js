/**
 * Sample React Native
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import AppPlatform from './lib/model/storeplatform';
import DynamicComponent from './DynamicComponent';
import ProductInfo from './components/ProductInfo';
import DemandwareComponent from './DemandwareComponent';

var features = ['cart'];

class ThirdApp extends DemandwareComponent {
  constructor(props) {
    super(props);
    this.state = {product: undefined};
  }

  getFeatures() {
    return features;
  }

  componentWillMount() {    
    super.componentWillMount();
    this.addGlobalEventListener('productLoaded', this.productLoaded, this);
  }

  resolveRoute(route, parts) {
    if (parts[0] == 'product') {
      var that = this;
      AppPlatform.Product.find(parts[1], {
        onload: function(e) {
          that.setState({product: e});
        },
        onerror: function(e) {
          console.log(e);
        }
      });
    }
  }

  productLoaded(e) {
    this.updateState({product: e.product});
  }

  render() {
    if (!this.state.product) {
      return (<View/>);
    }

    return (
      <View style={styles.container}>
        <ProductInfo product={this.state.product}/>
        <DynamicComponent template='file://views/addToCart'/>
      </View>
    );
  }
}

var styles = require('./styles/applicationModuleStyles');

module.exports = ThirdApp;
