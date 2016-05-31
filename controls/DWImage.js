/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import { Image } from 'react-native';

class DWImage extends Component {
  render() {
    return (
      <Image style={this.props.style} source={{uri: this.props.uri}}/>
    );
  }
}

module.exports = DWImage;
