'use strict'

import React, { Component, PropTypes } from 'react';
import { AppRegistry,NavigatorIOS } from 'react-native';
import MenuScreen from './src/MenuScreen'


export default class GTA_v1 extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MenuScreen,
          title: "Menu",
        }}
        style={{flex: 1}}
        />
    );
  }
}



AppRegistry.registerComponent('GTA_v1', () => GTA_v1);
