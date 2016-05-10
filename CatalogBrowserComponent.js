/**
 * Sample React Native
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

var AppPlatform = require('./lib/model/storeplatform');
var DynamicComponent = require('./DynamicComponent');

var browser;
var useServer = false;

class CatalogBrowserComponent extends Component {
  constructor(props) {
    super(props);
    browser = this;

    this.state = {
      queryString: 'red',
      results: undefined,
      cursor: 0,
      count: 0,
      product: undefined
    };
  }

  componentWillMount() {
    this.search();
  }

  loadProduct(id) {
    AppPlatform.Product.find(id, {
      onload: function(e) {
        browser.setState({product: e});
      },
      onerror: function(e) {
        console.log(e);
      }
    });
  }

  search() {
    AppPlatform.ProductSearch.search(this.state.queryString, {
      onload: function(e) {
        browser.setState({results: e, cursor: 0});
        browser.loadProduct(browser.state.results.hits[browser.state.cursor].product_id);
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
          <DynamicComponent controller={browser} template='http://localhost/views/textinput.js'/>
          <DynamicComponent product={this.state.product} template='http://localhost/views/image.js'/>
          <DynamicComponent controller={browser} template='http://localhost/views/buttons.js'/>
          <DynamicComponent product={this.state.product} template='http://localhost/views/productInfo.js'/>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <DynamicComponent controller={browser} template='file://views/textinput'/>
          <DynamicComponent product={this.state.product} template='file://views/image'/>
          <DynamicComponent controller={browser} template='file://views/buttons'/>
          <DynamicComponent product={this.state.product} template='file://views/productInfo'/>
        </View>
      );
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
