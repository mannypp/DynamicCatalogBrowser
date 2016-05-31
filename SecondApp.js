/**
 * Sample React Native
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import DemandwareComponent from './DemandwareComponent';


class SecondApp extends DemandwareComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Second app</Text>
      </View>
    );
  }
}

var styles = require('./styles/applicationModuleStyles');

module.exports = SecondApp;
