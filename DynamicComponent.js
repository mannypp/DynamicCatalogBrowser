/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import xml2js from 'xml2js';

var Features = require('./components/Features');

var DWText = require('./controls/DWText');
var DWButton = require('./controls/DWButton');
var DWImage = require('./controls/DWImage');
var DWTextInput = require('./controls/DWTextInput');

var coreCode = require('./views/views');
var customCode = require('./custom/views/views');
var componentCode = require('./components/components');

class DynamicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template: null,
      customTemplate: null,
      mergedTemplate: null,
      styles: null,
      customStyles: null,
      loaded: false
    };
  }

  componentWillMount() {
    this.loadComponent();
  }

  mergeDeep (o1, o2) {
      var tempNewObj = o1;

      //if o1 is an object - {}
      if (o1.length === undefined && typeof o1 !== "number") {
        for (var key in o2) {
          if (o1[key] === undefined) {
              tempNewObj[key] = value;
          } else {
              tempNewObj[key] = this.mergeDeep(o1[key], o2[key]);
          }
        }
      }

      //else if o1 is an array - []
      else if (o1.length > 0 && typeof o1 !== "string") {
        var index = 0;
        for (var key in o2) {
          if (JSON.stringify(o1).indexOf(JSON.stringify(o2[index])) === -1) {
              tempNewObj.push(o2[index]);
          }
          index++;
        }
      }

      //handling other types like string or number
      else {
          //taking value from the second object o2
          //could be modified to keep o1 value with tempNewObj = o1;
          tempNewObj = o2;
      }

      return tempNewObj;
  }

  mergeTemplates(template1, template2) {
    var result;

    xml2js.parseString(template1, (err, result1) => {
      console.log(JSON.stringify(result1));
      xml2js.parseString(template2, (err, result2) => {
        console.log(JSON.stringify(result2));
        var merged = this.mergeDeep(result1, result2);
        console.log(JSON.stringify(merged));
        result = {
          template: result1,
          customTemplate: result2,
          mergedTemplate: merged,
          loaded: true
        };
      });
    });

    return result;
  }

  loadFile(filePath) {
    var result, module1Styles, module2Styles;

    var index = filePath.lastIndexOf('/');
    var filename = filePath.substring(index + 1);
    var module1 = coreCode[filename];
    var module2 = customCode[filename];

    module1 && module1.view && console.log("Template: " + module1.view);
    module2 && module2.view && console.log("Custom Template: " + module2.view);

    if (module1 && module1.styles) {
      console.log("Styles: " + module1.styles);
      module1Styles = module1.styles;
    }
    if (module2 && module2.styles) {
      console.log("Custom Styles: " + module2.styles);
      module2Styles = module2.styles;
    }

    if (module2 && module2.view) {
      result = this.mergeTemplates(module1.view, module2.view);
      console.log("Merged Template: " + JSON.stringify(result.mergedTemplate));
    }
    else {
      xml2js.parseString(module1.view, (err, parseResult) => {
        console.log(JSON.stringify(parseResult));
        result = {
          template: parseResult,
          loaded: true
        };
      });
    }

    module1Styles && (result["styles"] = module1Styles);
    module2Styles && (result["customStyles"] = module2Styles);

    this.setState(result);
  }

  fetchUrl(url, handler) {
    console.log("Loading URL: " + url);
    fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'}
      })
      .then((response) => response.text())
      .then((responseText) => {
        handler(responseText);
      })
      .catch((error) => {
        console.log(error);
      })
      .done();
  }

  loadUrl(url) { // http://hello-world.dss.demandware.io/views/textinput.js
    var protocolIndex = url.indexOf(':');
    var protocol = url.substring(0, protocolIndex);
    var hostIndex = url.substring(protocolIndex + 3).indexOf('/');
    var hostname = url.substring(protocolIndex + 3, hostIndex + protocolIndex + 3);
    var filepath = url.substring(protocolIndex + hostIndex + 4);
    var customTemplateUrl = protocol + "://" + hostname + "/custom/" + filepath;

    if (!this.state.loaded) {
      this.fetchUrl(url, (templateText) => {
        var result = this.mergeTemplates(templateText, customTemplateText);
      });

      this.fetchUrl(customTemplateUrl, (customTemplateText) => {
      });

      this.fetchUrl(styleUrl, (styleText) => {
        var json = JSON.parse(styleText);
        result["styles"] = React.StyleSheet.create(json);
        this.setState(result);
      });
    }
  }

  loadComponent() {
    if (this.state.loaded) {
      return;
    }

    var path = this.props.template;

    if (path) {
      path = path.trim();
      if (path.startsWith('file://')) {
        this.loadFile(path.substring(7));
      }
      else if (path.startsWith('http://') || path.startsWith('https://')) {
        this.loadUrl(path);
      }
      else {
        console.log("Do not understand template: " + path);
      }
    }
  }

  // template translation and UI construction
  getStateValue(path) {
    let parts = path.split('.');
    let value = this.props;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].indexOf('[') == -1) {
        value = value[parts[i]];
      }
      else {
        var ind = parts[i].indexOf('[');
        var ind2 = parts[i].indexOf(']');
        var propName = parts[i].substring(0, ind);
        var index = Number(parts[i].substring(ind + 1, ind2));
        value = value[propName][index];
      }
    }

    if (!value) {
      value = path;
    }
    return value;
  }

  evaluateDisplayCondition(displayCondition) {
    if (displayCondition) {
      if (displayCondition == "true" || displayCondition == "1" || displayCondition == 1) {
        return true;
      }
      if (displayCondition == "false" || displayCondition == "0" || displayCondition == 0) {
        return false;
      }
      if (displayCondition.startsWith("feature-present:")) {
        var parts = displayCondition.split(':');
        return Features.getInstance().hasFeature(parts[1]);
      }
      if (!Boolean(this.getStateValue(displayCondition))) {
        return false;
      }
    }

    return true;
  }

  resolveTemplateValue(item, name) {
    return item && item.$ && item.$[name] ? item.$[name] : undefined;    
  }

  lookupStyle(styleName) {
    var st;
    
    if (this.state.customStyles && this.state.customStyles[styleName]) {
      st = this.state.customStyles[styleName];
    }
    else if (this.state.styles && this.state.styles[styleName]) {
      st = this.state.styles[styleName];
    }
    else if (styles[styleName]) {
      st = styles[styleName];
    }

    return st;
  }

  resolveHandler(handlerName) {
    var index = handlerName.indexOf('.');
    var moduleName = handlerName.substring(0, index);
    var methodName = handlerName.substring(index + 1);
    var module, handler;

    module = customCode[moduleName];
    if (module) {
      handler = module[methodName];
    }
    if (!handler) {
      module = coreCode[moduleName];
      if (module) {
        handler = module[methodName];
      }
    }

    return handler;
  }

  assembleView(result) {
    var contents, children = [], keyCounter = 0;

    for (var componentType in result) {
      if (componentType == '$') {
        continue;
      }

      contents = result[componentType];
      var arrayMode = Array.isArray(contents);
      var length = (arrayMode ? contents.length : 1);

      for (var i = 0; i < length; i++) {
        var item = (arrayMode ? contents[i] : contents);

        //handle displayCondition
        var displayCondition = this.resolveTemplateValue(item, "displayCondition");
        if (!this.evaluateDisplayCondition(displayCondition)) {
          continue;
        }

        //handle style
        var st = this.lookupStyle(this.resolveTemplateValue(item, "style"));

        switch(componentType) {
          case 'View':
            var viewChildren = this.assembleView(item);
            children.push(React.createElement(View, {key: keyCounter, style: st}, viewChildren));
          break;
          case 'Text':
            var value = this.getStateValue(item._);
            children.push(React.createElement(DWText, {key: keyCounter, style: st, value: value}));
          break;
          case 'Image':
            var uri = this.getStateValue(this.resolveTemplateValue(item, "source"));
            children.push(React.createElement(DWImage, {key: keyCounter, style: st, uri: uri}));
          break;
          case 'TextInput':
            var value = this.getStateValue(this.resolveTemplateValue(item, "value"));
            var changeTextHandler = this.resolveHandler(this.resolveTemplateValue(item, "changeText"));
            var submitHandler = this.resolveHandler(this.resolveTemplateValue(item, "submit"));
            children.push(React.createElement(DWTextInput, {key: keyCounter, style: st, value: value,
                      changeTextHandler: changeTextHandler, submitHandler: submitHandler}));
          break;
          case 'Button':
            var label = item._;
            var buttonSt = this.lookupStyle(this.resolveTemplateValue(item, "textStyle"));
            var handler = this.resolveHandler(this.resolveTemplateValue(item, "handler"));
            children.push(React.createElement(DWButton, {key: keyCounter, buttonStyle: st, buttonTextStyle: buttonSt,
                      handler: handler, buttonLabel: label, controller: this.props.controller}));
          break;
          case 'include':
            var template = this.resolveTemplateValue(item, "template");
            children.push(React.createElement(DynamicComponent, {key: keyCounter, template: template}));
          break;
        }
        keyCounter++;
      }
    }

    return children;
  }

  shouldComponentUpdate() {
    return this.state.loaded;
  }

  render() {
    /*if (!this.state.loaded) { // needs to be preloaded
      return (<View/>);
    }*/

    var res = this.assembleView(this.state.mergedTemplate ? this.state.mergedTemplate : this.state.template);
    if (res.length == 1) {
      return res[0];
    }
    return (<View>{res}</View>);
  }
}

var styles = require('./styles/applicationModuleStyles');

module.exports = DynamicComponent;
