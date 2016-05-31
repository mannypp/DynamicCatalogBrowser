/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import { Text } from 'react-native';

class DWText extends Component {
  render() {
    return (<Text style={this.props.style}>{this.props.value}</Text>);
  }
}

module.exports = DWText;
