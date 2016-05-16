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


var eventEmitter;


class SecondApp extends Component {
  componentDidMount() {
    eventEmitter = this.props.eventEmitter;
    eventEmitter.emit('features', {'features':['cart']});
  }

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
