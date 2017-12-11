'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, Text, ListView, TouchableHighlight, TouchableOpacity, Image } from 'react-native'

import AllTeamsWagers from './AllTeamsWagers';

import YesterdayMLB from './YesterdayMLB';
import YesterdayMLBLandscape from './YesterdayMLBLandscape';

import TodayMLB from './TodayMLB';
import TodayMLBLandscape from './TodayMLBLandscape';

import SeasonMLB from './SeasonMLB';
import SeasonMLBLandscape from './SeasonMLBLandscape';

class MlbWagers extends Component {
  constructor(props) {
    super(props);


    this.state = {
      seasonPressed: true,
      todayPressed: false,
      yesterdayPressed: false,
      dimensions: undefined,
      portrait:undefined,

    };


    this.seasonPress = this.seasonPress.bind(this);
    this.todayPress = this.todayPress.bind(this);
    this.yesterdayPress = this.yesterdayPress.bind(this);

  }


  onLayout = event => {

   //if (this.state.dimensions) return // layout was already called

   const l = event ? event.nativeEvent.layout : Dimensions.get('window'); // it doesn't always give the event


   var orient;
   if (l.height > l.width) {
     orient = true;
   }
   else{
     orient = false;
   }



   this.setState({dimensions: true,
                  portrait:orient,
                });
 }


  render() {

        if (this.state.seasonPressed) {

          return (
            <View style={{flex: 1, alignSelf:'stretch'}} onLayout={this.onLayout}>
            { this.state.dimensions ?
            <View style={{flex:1, flexDirection:'column'}}>
              <View style={{flex: 12}}>
                {this.state.portrait ? <SeasonMLB/> : <SeasonMLBLandscape/>}
              </View>
              <View style={styles.bottomButtons}>

                  <TouchableOpacity disabled={true} style={styles.bottomOpacityTrue}>
                    <Text style={styles.bottomButtonText}>Season</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.todayPress} style={styles.bottomOpacityFalse}>
                    <Text style={styles.bottomButtonText}>Today</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.yesterdayPress} style={styles.bottomOpacityFalse}>
                    <Text style={styles.bottomButtonText}>Yesterday</Text>
                  </TouchableOpacity>

              </View>
              </View>
              :
              undefined}
            </View>
          )
        }
        else if (this.state.todayPressed) {
          return (
            <View style={{flex: 1, alignSelf:'stretch'}} onLayout={this.onLayout}>
            { this.state.dimensions ?
            <View style={{flex:1, flexDirection:'column'}}>
              <View style={{flex: 12}}>
                {this.state.portrait ? <TodayMLB/> : <TodayMLBLandscape/>}
              </View>
              <View style={styles.bottomButtons}>

                <TouchableOpacity onPress={this.seasonPress} style={styles.bottomOpacityFalse}>
                  <Text style={styles.bottomButtonText}>Season</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={true} style={styles.bottomOpacityTrue}>
                  <Text style={styles.bottomButtonText}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.yesterdayPress} style={styles.bottomOpacityFalse}>
                  <Text style={styles.bottomButtonText}>Yesterday</Text>
                </TouchableOpacity>


              </View>
              </View>
              : undefined}
            </View>
          )
        }

        else {
          return (
            <View style={{flex: 1, alignSelf:'stretch'}} onLayout={this.onLayout}>
            { this.state.dimensions ?
            <View style={{flex:1, flexDirection:'column'}}>
              <View style={{flex:12}}>
                {this.state.portrait ? <YesterdayMLB/> : <YesterdayMLBLandscape/>}
              </View>

              <View style={styles.bottomButtons}>

                <TouchableOpacity onPress={this.seasonPress} style={styles.bottomOpacityFalse}>
                  <Text style={styles.bottomButtonText}>Season</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.todayPress} style={styles.bottomOpacityFalse}>
                  <Text style={styles.bottomButtonText}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={true} style={styles.bottomOpacityTrue}>
                  <Text style={styles.bottomButtonText}>Yesterday</Text>
                </TouchableOpacity>


              </View>
              </View>
              : undefined}
            </View>
          )
        }


  }



  seasonPress() {
    this.setState({
      seasonPressed:true,
      todayPressed:false,
      yesterdayPressed:false,

    });
  }

  todayPress() {
    this.setState({
      seasonPressed:false,
      todayPressed:true,
      yesterdayPressed:false,

    });
  }

  yesterdayPress(){
    this.setState({
      seasonPressed:false,
      todayPressed:false,
      yesterdayPressed:true,
    });
  }



}

export default MlbWagers;




const styles = StyleSheet.create({
  bottomButtons: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor:'dimgray',
    alignItems:'center'
  },
  bottomButtonText: {
    fontFamily:'cochin',
    fontSize:18,
    fontWeight:'600',
    color:'white',
    letterSpacing:1.2,
    alignSelf: 'center'
  },
  bottomOpacityTrue:{
    flex:2,
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:'darkslategray',
    alignItems:'center',
    alignSelf:'stretch'
  },
  bottomOpacityFalse: {
    flex:2,
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:'lightslategray',
    alignItems:'center',
    alignSelf:'stretch'
  },
  row: {
   flexDirection: 'row',
   justifyContent: 'center',
   padding: 10,
   backgroundColor: '#F6F6F6',
 },
 thumb: {
   width: 75,
   height:50,
   padding:1.
 },
 text: {
   flex: 1,
 },

 listView: {
       backgroundColor: '#F5FCFF'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },

  sectionContainer: {
    flex: 1,
    backgroundColor: 'forestgreen',
  },
  sectionText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 8,
    color: 'white',
  },
  nav: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'azure',
    borderBottomWidth:1,
    borderColor:'black',
  }


});
