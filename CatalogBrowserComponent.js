/**
 * Sample React Native
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

var DynamicComponent = require('./DynamicComponent');

import AppPlatform from './lib/model/storeplatform';
import ProductInfo from './components/ProductInfo';
import CatalogBrowserButtons from './components/CatalogBrowserButtons';
import DemandwareComponent from './DemandwareComponent';

var useServer = false;
var features = ['search'];

class CatalogBrowserComponent extends DemandwareComponent {
  constructor(props) {
    super(props);
    this.state = {
      queryString: 'red',
      results: undefined,
      cursor: 0,
      count: 0,
      product: undefined
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.search();
  }

  getFeatures() {
    return features;
  }

  loadProduct(id) {
    var that = this;
    AppPlatform.Product.find(id, {
      onload: function(e) {
        that.setState({product: e});
        that.fireGlobalEvent('productLoaded', {'product':e});
      },
      onerror: function(e) {
        console.log(e);
      }
    });
  }

  search() {
    var that = this;
    AppPlatform.ProductSearch.search(this.state.queryString, {
      onload: function(e) {
        that.setState({results: e, cursor: 0});
        that.loadProduct(that.state.results.hits[that.state.cursor].product_id);
      },
      onerror: function(e) {
        console.log(e);
      }
    });
  }

  render() {
    if (!this.state.product) {
      return (<View/>);
    }

    if (useServer) {
      return (
        <View style={styles.container}>
          <DynamicComponent controller={this} template='http://localhost/views/textinput.js'/>
          <DynamicComponent product={this.state.product} template='http://localhost/views/image.js'/>
          <DynamicComponent controller={this} template='http://localhost/views/buttons.js'/>
          <DynamicComponent product={this.state.product} template='http://localhost/views/productInfo.js'/>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <DynamicComponent controller={this} template='file://views/textinput'/>
          <DynamicComponent product={this.state.product} template='file://views/image'/>
          <DynamicComponent controller={this} template='file://views/buttons'/>
          <ProductInfo product={this.state.product}/>
          <DynamicComponent template='file://views/addToCart'/>
        </View>
      );
      //<DynamicComponent product={this.state.product} template='file://views/productInfo'/>
    }

    /*  Original JSX
        <TextInput style={styles.input} onChangeText={(text) => this.setState({queryString: text}) } onSubmitEditing={browser.search.bind(this)} value={this.state.queryString}/>
        <Image style={styles.image} source={{uri: (this.state.product ? this.state.product.image_groups[0].images[0].link : '')}}/>
        <View style={styles.buttonContainer}>
          <DWButton buttonStyle={styles.prevButton} buttonTextStyle={styles.buttonText} handler={this.prevButtonClicked}>Prev</DWButton>
          <DWButton buttonStyle={styles.nextButton} buttonTextStyle={styles.buttonText} handler={this.nextButtonClicked}>Next</DWButton>
        </View>
    */
  }
}

var styles = require('./styles/applicationModuleStyles');

module.exports = CatalogBrowserComponent;
