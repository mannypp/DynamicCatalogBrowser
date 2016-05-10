/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class DWButton extends Component {
  render() {
    return (
        <TouchableHighlight style={this.props.buttonStyle} onPress={this.props.handler.bind(this)}>
          <View>
            <Text style={this.props.buttonTextStyle}>{this.props.buttonLabel}</Text>
          </View>
        </TouchableHighlight>
      );
  }
}

module.exports = DWButton;
