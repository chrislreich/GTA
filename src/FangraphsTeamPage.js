'use strict'
import React, { Component, PropTypes } from 'react';
import {WebView, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';

const WEBVIEW_REF = "WEBVIEW_REF";


export default class FangraphsTeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
    }
  }

/*
  render() {
    var uriStr = "https://www.fangraphs.com/teams/" + this.props.fangraphs_team + "/stats";
    return(
       <View style={{flexDirection:'column'}}>
       <View style={{flex:1}}>
         <TouchableOpacity
           disabled={!this.state.canGoBack}
           onPress={this.onBack.bind(this)}
           >
           <Text style={{}}>Go Back</Text>
         </TouchableOpacity>
       </View>
       <View style={{flex:10}}>
        <WebView
          ref={WEBVIEW_REF}
          source={{uri: uriStr}}
          style={{marginTop: 0}}
          scalesPageToFit={true}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}

          />
        </View>

      </View>

    );
  }
*/


render() {
  var uriStr = "https://www.fangraphs.com/teams/" + this.props.fangraphs_team + "/stats";
    return (
      <View style={styles.container}>

        <WebView
          ref={WEBVIEW_REF}
          style={{flex: 1}}
          onNavigationStateChange=
            {this.onNavigationStateChange.bind(this)}
          source={{uri: uriStr}}
          scalesPageToFit={true}
          />

            <TouchableOpacity style={styles.topbar}
              disabled={!this.state.canGoBack}
              onPress={this.onBack.bind(this)}
              >
              <Text style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled}>Back</Text>
            </TouchableOpacity>

      </View>
    );
  }

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
}



}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15, /* Padding to push below the navigation bar */
    backgroundColor: 'black',
  },
  topbar: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'stretch'
  },
  topbarTextDisabled: {
    color: 'gray'
  },
  topbarText: {
    color: 'white'
  }
});
