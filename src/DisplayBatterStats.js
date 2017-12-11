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

export default class DisplayBatterStats extends Component {
  constructor(props) {
    super(props);


    this.state = {showProjections: false};

    this.currentPressed = this.currentPressed.bind(this);
    this.projectionsPressed = this.projectionsPressed.bind(this);
    this.namePressed = this.namePressed.bind(this);



  }

  currentPressed() {
    this.setState({showProjections:false});
  }

  projectionsPressed() {
    this.setState({showProjections:true})
  }


  namePressed() {
    this.props.handler(false);
    this.props.nav.push({
      title:this.props.player,
      component:PlayerWebView,
      passProps:{player_id:this.props.currentData.player_id}


    })
  }

  displayStats(inpt) {
    return inpt ? inpt : "0";
  }


  render() {
    if (!this.state.showProjections) {
      var c = this.props.currentData;
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
          <View style={{flex:.5, alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <Text style={styles.nameText} onPress={this.namePressed}>{this.props.player}</Text>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>PA</Text>
              <Text style={styles.boxText}>{this.displayStats(c.pa)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>wRC+</Text>
              <Text style={styles.boxText}>{this.displayStats(c[`wrc+`])}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>Avg</Text>
              <Text style={styles.boxText}>{this.displayStats(c.avg)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BABIP</Text>
              <Text style={styles.boxText}>{this.displayStats(c.babip)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>OBP</Text>
              <Text style={styles.boxText}>{this.displayStats(c.obp)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BSR</Text>
              <Text style={styles.boxText}>{this.displayStats(c.bsr)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>SLG</Text>
              <Text style={styles.boxText}>{this.displayStats(c.slg)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>ISO</Text>
              <Text style={styles.boxText}>{this.displayStats(c.iso)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>KK%</Text>
              <Text style={styles.boxText}>{this.displayStats(c.kk_pct)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BB%</Text>
              <Text style={styles.boxText}>{this.displayStats(c.bb_pct)}</Text>
            </View>
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
            <Text style={styles.nameText} onPress={this.namePressed}>{this.props.player}</Text>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>PA</Text>
              <Text style={styles.boxText}>{this.displayStats(p.pa)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>wRC+</Text>
              <Text style={styles.boxText}>{this.displayStats(p.wrc_plus)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>Avg</Text>
              <Text style={styles.boxText}>{this.displayStats(p.avg)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BABIP</Text>
              <Text style={styles.boxText}>{this.displayStats(p.babip)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>OBP</Text>
              <Text style={styles.boxText}>{this.displayStats(p.obp)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BSR</Text>
              <Text style={styles.boxText}>{this.displayStats(p.bsr)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>SLG</Text>
              <Text style={styles.boxText}>{this.displayStats(p.slg)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>ISO</Text>
              <Text style={styles.boxText}>{this.displayStats(p.iso)}</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>KK%</Text>
              <Text style={styles.boxText}>{this.displayStats(p.kk_pct)}</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BB%</Text>
              <Text style={styles.boxText}>{this.displayStats(p.bb_pct)}</Text>
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
    fontSize:16,
    color:'navy',
    fontWeight:'600',
  }
});
