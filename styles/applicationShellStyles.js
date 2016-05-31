'use strict';

var React = require('react-native');

var styles = React.StyleSheet.create({
  applicationContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  navigationBar: {
    backgroundColor: '#E0E0E0',
    top: 20,
    height: 45
  },
  navTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18
  },
  leftNavButtonText: {
    borderLeftWidth: 5,
    top: 2,
    fontSize: 14,
    color: 'blue'
  },
  rightNavButtonText: {
    borderRightWidth: 5,
    top: 2,
    fontSize: 14,
    color: 'blue'
  },
  navSceneStyle: {
    borderWidth: 4,
    borderColor: '#E0E0E0',
    top: 45
  }
});

module.exports = styles;
