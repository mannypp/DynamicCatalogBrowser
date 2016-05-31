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

var Events = require('./components/Events').getInstance();

class DemandwareComponent extends Component {
  setupEventListeners() {
    Events.addGlobalEventListener('route', this.preResolveRoute, this);
  }

  componentWillMount() {    
    this.setupEventListeners();
  }

  componentDidMount() {
    Events.fireGlobalEvent('features', {'features': this.getFeatures()});
  }

  getFeatures() {
    return [];
  }

  addGlobalEventListener(eventName, handler, context) {
    Events.addGlobalEventListener(eventName, handler, context);
  }

  fireGlobalEvent(eventName, data) {
    Events.fireGlobalEvent(eventName, data);
  }

  resolveRoute(route, parts) { // route arg is array of url parts
    // should be overridden by subclass
  }

  preResolveRoute(route) {
    var parts = route.url.split('/');
    if (parts && parts[0].indexOf(':') > -1) {
      parts.shift();
    }
    parts.shift();
    this.resolveRoute(route, parts);
  }

  updateState(state) {
    this.setState(state);
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (<View style={styles.container}/>);
  }
}

var styles = require('./styles/applicationModuleStyles');

module.exports = DemandwareComponent;
