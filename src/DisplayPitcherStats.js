'use strict'

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  TouchableHighlight, Image, Button, Modal, ScrollView, TouchableWithoutFeedback, WebView
} from 'react-native';

const Dimensions = require('Dimensions');



class PlayerWebView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

        <WebView
          source={{uri: 'http://www.fangraphs.com/statss.aspx?playerid=' + this.props.player_id}}
          style={{marginTop: 0}}
          scalesPageToFit={true}
        />
    )
  }
}

export default class DisplayStats extends Component {
  constructor(props) {
    super(props);


    this.state = {showProjections: false, webViewPressed:false};

    this.currentPressed = this.currentPressed.bind(this);
    this.projectionsPressed = this.projectionsPressed.bind(this);
    this.namePressed = this.namePressed.bind(this);


  }

  currentPressed() {
    this.setState({showProjections:false});
  }

  projectionsPressed() {
    this.setState({showProjections:true});
  }

  namePressed() {
    this.props.handler(false);
    this.props.nav.push({
      title:this.props.player,
      component:PlayerWebView,
      passProps:{player_id:this.props.currentData.player_id}

    })
  }

  displayString(inpt) {
    return inpt ? inpt : "0";
  }


  render() {
    if (!this.state.showProjections) {
      var c = this.props.currentData;
      var {height, width} = Dimensions.get('window');
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
          <View style={{flex:.5, alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <Text style={styles.nameText} onPress={this.namePressed}>{this.props.player}</Text>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>G</Text>
              <Text style={styles.boxText}>{this.displayString(c.g)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>GS</Text>
              <Text style={styles.boxText}>{this.displayString(c.gs)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>IP</Text>
              <Text style={styles.boxText}>{this.displayString(c.ip)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>ERA</Text>
              <Text style={styles.boxText}>{this.displayString(c.era)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>FIP</Text>
              <Text style={styles.boxText}>{this.displayString(c.fip)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>SIERA</Text>
              <Text style={styles.boxText}>{this.displayString(c.siera)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>K/9</Text>
              <Text style={styles.boxText}>{this.displayString(c.k_9)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>BB/9</Text>
              <Text style={styles.boxText}>{this.displayString(c.bb_9)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>HR/9</Text>
              <Text style={styles.boxText}>{this.displayString(c.hr_9)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>GB%</Text>
              <Text style={styles.boxText}>{this.displayString(c.gb_pct)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>BABIP</Text>
              <Text style={styles.boxText}>{this.displayString(c.babip)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>HR/FB%</Text>
              <Text style={styles.boxText}>{this.displayString(c.hr_fb)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>K%</Text>
              <Text style={styles.boxText}>{this.displayString(c.kk_pct)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>BB%</Text>
              <Text style={styles.boxText}>{this.displayString(c.bb_pct)}</Text>
            </View>
          </View>
          <View style={{height:0, width:0}}>
            <WebView
              source={{uri: 'http://www.fangraphs.com/statss.aspx?playerid=' + c.player_id}}
            />
          </View>
        <View style={styles.bar}>
            <TouchableOpacity disabled={true} style={styles.pressed}>
              <Text>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.projectionsPressed} style={styles.unPressed}>
              <Text>Projections</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else {
      var p = this.props.projData;
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
          <View style={{flex:.5, alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <Text style={styles.nameText}>{this.props.player}</Text>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>G</Text>
              <Text style={styles.boxText}>{this.displayString(p.g)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>GS</Text>
              <Text style={styles.boxText}>{this.displayString(p.gs)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>IP</Text>
              <Text style={styles.boxText}>{this.displayString(p.ip)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>FIP</Text>
              <Text style={styles.boxText}>{this.displayString(p.fip)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>K/9</Text>
              <Text style={styles.boxText}>{this.displayString(p.k_9)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>BB/9</Text>
              <Text style={styles.boxText}>{this.displayString(p.bb_9)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.topboxText}>HR/9</Text>
              <Text style={styles.boxText}>{this.displayString(p.hr_9)}</Text>
            </View>
          </View>
        <View style={styles.bar}>
            <TouchableOpacity onPress={this.currentPressed}  style={styles.unPressed}>
              <Text>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={true}  style={styles.pressed}>
              <Text>Projections</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  bigBox: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderTopWidth:1,
    borderColor:'lightgray'

  },
  littleBox:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  boxText: {
    fontSize:16,
  },
  topboxText: {
    fontSize:16,
    textDecorationLine:'underline'
  },
  bar: {
    flex:.4,
    flexDirection:'row',
    alignItems:'center',
  },
  pressed: {
    flex:2,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'stretch',
    backgroundColor:'lightslategray',
  },
  unPressed:{
    flex:2,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'stretch',
    backgroundColor:'lightsteelblue',
  },
  nameText:{
    fontSize:18,
    color:'navy',
    fontWeight:'600',
  }
});
