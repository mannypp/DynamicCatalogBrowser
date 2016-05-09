/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component
} from 'react-native';

//import codePush from "react-native-code-push";

var CatalogBrowserComponent = require('./CatalogBrowserComponent');

class DynamicCatalogBrowser extends Component {
  render() {
    return (<CatalogBrowserComponent/>);
  }
}

AppRegistry.registerComponent('DynamicCatalogBrowser', () => DynamicCatalogBrowser);
