'use strict'
import React, { Component, PropTypes } from 'react';
import {WebView, View, Text, ActivityIndicator, StyleSheet} from 'react-native';


export default class BetWebView extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    var uriStr = "https://mobile.betonline.ag/login";

    var jsInject1 = "document.getElementById('Username').value='B923208';";
    var jsInject2 = "document.getElementById('password').value='7897897Qq';";
    var jsInject3 = "document.querySelector('input[name=login]').click();";
    var totalInject = jsInject1 + jsInject2 + jsInject3;

    return(

        <WebView
          source={{uri: uriStr}}
          style={{marginTop: 0}}
          injectedJavaScript={totalInject}
          />

    );
  }


}
