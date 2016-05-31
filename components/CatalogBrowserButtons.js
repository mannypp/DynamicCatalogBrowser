import React, { Component } from 'react';
import DynamicComponent from '../DynamicComponent';

class CatalogBrowserButtons extends Component {
  render() {
    return (<DynamicComponent controller={this.props.controller} template='file://views/buttons'/>);
  }
}

module.exports = CatalogBrowserButtons;
