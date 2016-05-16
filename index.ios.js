/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  View,
  Text,
  TouchableHighlight,
  Linking
} from 'react-native';

var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');


var _navigator;
var eventEmitter = new EventEmitter();
var features = [];

var CatalogBrowserComponent = require('./CatalogBrowserComponent');
var SecondApp = require('./SecondApp');
var ThirdApp = require('./ThirdApp');

var applicationModules = [CatalogBrowserComponent, SecondApp, ThirdApp]; // will be loaded from remote configuration source
var applicationModulePassProps = {eventEmitter: eventEmitter};
var ROUTE_STACK = [
  {name:'Catalog Browser', component:applicationModules[0], index:0, passProps: applicationModulePassProps, deepLinkPath: 'catalogBrowser'},
  {name:'Second App', component:applicationModules[1], index:1, passProps: applicationModulePassProps, deepLinkPath: 'secondApp'},
  {name:'Third App', component:applicationModules[2], index:2, passProps: applicationModulePassProps, deepLinkPath: 'thirdApp'}
];


var NavBarRouteMapper = {
  LeftButton(route, navigator, index, navState) { 
    if(index > 0) {
      return (
        <TouchableHighlight underlayColor="transparent"
          onPress={() => {
            if (_navigator.state.presentedIndex > 0) {
              _navigator.jumpBack()
            }
          }}>
          <Text style={ styles.leftNavButtonText }>&lt; { ROUTE_STACK[index - 1].name }</Text>
        </TouchableHighlight>)
    } 
    else {
      return null;
    }
  },
  RightButton(route, navigator, index, navState) { 
    if (index < ROUTE_STACK.length - 1) {
      return (
        <TouchableHighlight
          onPress={ () => {
            if (_navigator.state.presentedIndex < ROUTE_STACK.length - 1) {
              _navigator.jumpForward()
            }
          }}>
          <Text style={ styles.rightNavButtonText }>{ ROUTE_STACK[index + 1].name } &gt;</Text>
        </TouchableHighlight>)
    }
  },
  Title(route, navigator, index, navState) { 
    return <Text style={ styles.navTitle }>{ROUTE_STACK[index].name}</Text>
  }  
}


// ApplicationShell
var DynamicCatalogBrowser = React.createClass({
  mixins: [Subscribable.Mixin],

  setupEventListeners: function() {
    this.addListenerOn(eventEmitter, 'features', this.addAppFeatures);
    this.addListenerOn(eventEmitter, 'testEvent', this.logEvent);
  },

  checkForDeepLinkUrl: function() {
    var url = Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));
  },

  componentWillMount: function() {
    this.setupEventListeners();
  },

  componentDidMount: function() {
    this.checkForDeepLinkUrl();
  },

  addAppFeatures: function(event){
    console.log('received features event: ' + event.features);
    if (event.features && event.features.length > 0) {
      features = features.concat(event.features);
      console.log('added app features: ' + event.features);
      console.log('all app features: ' + features);
    }
  },

  navigatorRenderScene: function(route, navigator) {
    if (!_navigator) {
      _navigator = navigator;
    }

    return (React.createElement(applicationModules[route.index], {key:0, title:route.name, navigator:_navigator, ...route.passProps} ));
  },

  navigatorConfigureScene: function() {
    return Navigator.SceneConfigs.PushFromRight;
  },

  shouldComponentUpdate: function() { // determines if render() should be called after state is updated
    return true;
  },

  render: function() {
    return (
        <Navigator style={styles.applicationContainer}
          sceneStyle={styles.navSceneStyle}
          renderScene={this.navigatorRenderScene}
          configureScene={this.configureScene}
          initialRoute={ROUTE_STACK[0]}
          initialRouteStack={ROUTE_STACK}
          navigationBar={<Navigator.NavigationBar style={styles.navigationBar} routeMapper={NavBarRouteMapper}
                          initialRoute={ROUTE_STACK[0]} initialRouteStack={ROUTE_STACK}/>}
        />
      );
  }
});

var styles = require('./styles/applicationShellStyles');

AppRegistry.registerComponent('DynamicCatalogBrowser', () => DynamicCatalogBrowser);
