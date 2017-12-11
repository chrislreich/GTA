'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button } from 'react-native'


import MenuScreen from './MenuScreen'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {text1: '',
                  text2: ''};
  }


  _handlePress() {
    if(this.state.text1 == '' && this.state.text2 == '') {
        this.props.navigator.push({
          title: "Menu",
          component: MenuScreen,
        });
    }
    else if(this.state.text1 != 'A'){
      AlertIOS.alert("Invalid Username");
    }
    else {
      AlertIOS.alert("Invalid Password")
    }
  }


  render() {
      return (
        <View style={styles.container}>
          <TextInput
            style={{height: 40}}
            placeholder="Username"
            onChangeText={(text1) => this.setState({text1})}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text2) => this.setState({text2})}
          />
          <Button
            onPress={() => this._handlePress()}
            title="Submit"
            color="#841584"
            />
        </View>
      );
    }
}


export default LoginView;
