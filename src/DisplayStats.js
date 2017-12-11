'use strict'

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  TouchableHighlight, Image, Button, Modal, ScrollView, TouchableWithoutFeedback
} from 'react-native';



export default class DisplayStats extends Component {
  constructor(props) {
    super(props);


    this.state = {showProjections: false};

    this.currentPressed = this.currentPressed.bind(this);
    this.projectionsPressed = this.projectionsPressed.bind(this);


  }

  currentPressed() {
    this.setState({showProjections:false});
  }

  projectionsPressed() {
    this.setState({showProjections:true})
  }


  render() {
    if (!this.state.showProjections) {
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
          <View style={{flex:.5, alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <Text style={styles.boxText}>{this.props.player}</Text>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>PA</Text>
              <Text style={styles.boxText}>206</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>wRC+</Text>
              <Text style={styles.boxText}>104</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>Avg</Text>
              <Text style={styles.boxText}>.305</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BABIP</Text>
              <Text style={styles.boxText}>.430</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>OBP</Text>
              <Text style={styles.boxText}>.405</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BSR</Text>
              <Text style={styles.boxText}>2.3</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>SLG</Text>
              <Text style={styles.boxText}>.698</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>ISO</Text>
              <Text style={styles.boxText}>.270</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>KK%</Text>
              <Text style={styles.boxText}>33.58</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BB%</Text>
              <Text style={styles.boxText}>22.73</Text>
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
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
          <View style={{flex:.5, alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <Text style={styles.boxText}>{this.props.player}</Text>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>PA</Text>
              <Text style={styles.boxText}>206</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>wRC+</Text>
              <Text style={styles.boxText}>104</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>Avg</Text>
              <Text style={styles.boxText}>.305</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BABIP</Text>
              <Text style={styles.boxText}>.430</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>OBP</Text>
              <Text style={styles.boxText}>.405</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BSR</Text>
              <Text style={styles.boxText}>2.3</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>SLG</Text>
              <Text style={styles.boxText}>.698</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>ISO</Text>
              <Text style={styles.boxText}>.270</Text>
            </View>
          </View>
          <View style={styles.bigBox}>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>KK%</Text>
              <Text style={styles.boxText}>33.58</Text>
            </View>
            <View style={styles.littleBox}>
              <Text style={styles.boxText}>BB%</Text>
              <Text style={styles.boxText}>22.73</Text>
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
  }
});
