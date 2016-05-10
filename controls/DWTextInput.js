/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  TextInput
} from 'react-native';

class DWTextInput extends Component {
  render() {
    return (<TextInput style={this.props.style}
              onChangeText={this.props.changeTextHandler.bind(this)}
              onSubmitEditing={this.props.submitHandler.bind(this)}
              value={this.props.value}/>);
  }
}

module.exports = DWTextInput;
