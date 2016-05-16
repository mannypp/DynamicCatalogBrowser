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

class ThirdApp extends Component {
  componentDidMount() {
    this.props.eventEmitter.emit('features', {'features':[]});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Third app</Text>
      </View>
    );
  }
}

var styles = require('./styles/applicationModuleStyles');

module.exports = ThirdApp;
