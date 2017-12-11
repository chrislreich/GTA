'use strict'
import React, { Component, PropTypes } from 'react';
import {WebView, View, Text, ActivityIndicator, StyleSheet} from 'react-native';


export default class GameWebView extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    var uriStr = "https://mobile.betonline.ag/sports/offerings?s=Baseball&l=MLB&p=0&rn=" + String(this.props.url_id);
    console.log("URL PRINT")
    console.log(uriStr);
    return(

        <WebView
          source={{uri: uriStr}}
          style={{marginTop: 0}}

          />

    );
  }


}
