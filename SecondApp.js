/**
 * Sample React Native
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

class SecondApp extends Component {
  features() {
    return ['cart'];
  }

  render() {
    return (
      <View>
        <Text>Second app</Text>
      </View>
    );
  }
}

var styles = require('./styles/applicationModuleStyles');

module.exports = CatalogBrowserComponent;
