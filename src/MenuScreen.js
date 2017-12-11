'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, ListView, TouchableHighlight, Image, Text } from 'react-native'
import MLBLines from './MLBLines'
import CurrentBets from './CurrentBets'
import MlbWagers from './reporting/mlb/MlbWagers';
import AllTeamsWagers from './reporting/mlb/AllTeamsWagers';
import BetWebView from './BetWebView';

var THUMB_URLS = [
  require('../Thumbnails/mlbLogo_copy.jpeg'),
  require('../Thumbnails/cfb.png'),
  require('../Thumbnails.nfl.jpg')
];


class MenuScreen extends Component {

  constructor(props) {
   super(props);
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
     dataSource: ds.cloneWithRows(['MLB Lines', 'NCAAF', 'NFL']),
   };
   this._pressRow = this._pressRow.bind(this);
   this._renderRow = this._renderRow.bind(this);
 };

 render() {
   return (
     <View style={{flex:1, alignSelf:'stretch'}}>
     <ListView style={{backgroundColor:'gainsboro'}}
       dataSource={this.state.dataSource}
       renderRow={this._renderRow}
     />
     <View style={{height:0, width:0}}>
       <BetWebView/>
     </View>
     </View>
   );
 };


 _renderRow(rowData : string, sectionID: number, rowID : number, highlightRow: (sectionID: number, rowID: number) => void) {
   var imgSource = THUMB_URLS[rowID];

   if (rowID == 0) {
     return (
        <TouchableHighlight onPress={() => {
            this._pressRow(rowID);
            highlightRow(sectionID, rowID);
          }}>
          <View>
            <View style={styles.mlbRow}>
              <Image style={styles.thumb} source={imgSource} />
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
   }
   else if (rowID == 1){
     return (
        <TouchableHighlight onPress={() => {
            this._pressRow(rowID);
            highlightRow(sectionID, rowID);
          }}>
          <View>
            <View style={styles.cfbRow}>
              <Image style={{width:160, height:98}} source={imgSource} />
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
   }
   else if (rowID == 2) {
     return (
       <TouchableHighlight onPress={() => {
           this._pressRow(rowID);
           highlightRow(sectionID, rowID);
         }}>
         <View>
           <View style={styles.nflRow}>
             <Image style={{width:160, height:120}} source={imgSource} />
           </View>
           <View style={styles.separator} />
         </View>
       </TouchableHighlight>
     )

   }
   else {
     return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.betonlineRow}>
            <Image style={styles.thumb} source={imgSource} />
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
 };



 _pressRow(rowID: number) {
   if(rowID == 0) {
     this.props.navigator.push({
       title: "MLB",
       component: MLBLines,
       rightButtonTitle: "Reporting",
       onRightButtonPress: () => this.props.navigator.push({
         title: "Reporting",
         component: MlbWagers,
         rightButtonTitle:'By Team',
         onRightButtonPress: () => this.props.navigator.push({
           title:'Teams',
           component: AllTeamsWagers
         })

       })
     });
   }

 };

};


const styles = StyleSheet.create({
  mlbRow: {
   flexDirection: 'row',
   justifyContent: 'center',
   padding: 5,
   backgroundColor: 'navy',
 },
 betonlineRow: {
   flexDirection: 'row',
   justifyContent: 'center',
   padding: 5,
   backgroundColor: 'black',
 },
 cfbRow: {
   flexDirection: 'row',
   justifyContent: 'center',
   padding: 5,
   backgroundColor: 'ivory',
   height:130,
   alignItems:'center'
 },
 nflRow: {
   flexDirection: 'row',
   justifyContent: 'center',
   padding: 5,
   backgroundColor: 'midnightblue',
 },
 thumb: {
   width: 160,
   height: 120,
 },
 text: {
   flex: 1,
 },

 listView: {
       backgroundColor: 'azure'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  rightContainer: {
        flex: 1
    },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  separator: {
       height: 2,
       backgroundColor: 'black'
   },
});


export default MenuScreen;
