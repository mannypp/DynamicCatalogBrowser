/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StatusBar
} from 'react-native';

//import codePush from "react-native-code-push";

var CatalogBrowserComponent = require('./CatalogBrowserComponent');
var SecondApp = require('./SecondApp');

var applicationModules = [CatalogBrowserComponent, SecondApp]; // will be loaded from remote configuration source

var _navigator;
var _features = [];

class DynamicCatalogBrowser extends Component {
  componentDidLoad() {
    for (var module in applicationModules) {
      _features.concat(module.features());
    }
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch(route.id) {
      case '':
        return 
    }
  }

  render() {
    return (
      <Navigator style={styles.applicationContainer} initialRoute={{id:'Dynamic Catalog Browser', index:0}} renderScene={this.navigatorRenderScene}>
        <StatusBar backgroundColor="blue" barStyle="light-content"/>
        
        {applicationModules.map((module, index) => {
          return React.createElement(module, {key:index});
        })}
      </Navigator>);
  }
}

var styles = require('./styles/applicationShellStyles');

AppRegistry.registerComponent('DynamicCatalogBrowser', () => DynamicCatalogBrowser);
