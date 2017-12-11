'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, Text, ListView, TouchableHighlight } from 'react-native'

import AllPendingWagers from './reporting/AllPendingWagers';
import MlbWagers from './reporting/mlb/MlbWagers';
import AllTeamsWagers from './reporting/mlb/AllTeamsWagers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  separator: {
       height: 2,
       backgroundColor: 'black'
   },
});


class CurrentBets extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['All Pending Wagers', 'MLB', 'Futures', 'NCAAF', 'NFL']),
    };

    this._pressRow.bind(this);
  }

  _renderRow(rowData : string, sectionID: number, rowID : number, highlightRow: (sectionID: number, rowID: number) => void) {
    return(
    <TouchableHighlight onPress={() => {
        this._pressRow(rowID);
        highlightRow(sectionID, rowID);
      }}>
      <View>
        <View style={{backgroundColor:'darkslategray'}}>
          <Text style={{fontSize:40, textAlign:'center', fontFamily:'cochin', padding:32, color:'snow'}}>{rowData}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    </TouchableHighlight>
  );
  }

  _pressRow(rowID: number) {
     if (rowID == 0) {
       this.props.navigator.push({
         title: "Pending",
         component: AllPendingWagers
       });
     }
     else if (rowID == 1) {
       this.props.navigator.push({
         title: "MLB",
         component: MlbWagers,
         rightButtonTitle: "By Team",
         onRightButtonPress: () => this.props.navigator.push({
           title: "Teams",
           component: AllTeamsWagers,

         })
       })
     }
  }

render() {
    return (
      <ListView style={{backgroundColor:'slategray'}}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
      />
    );

  }
};






export default CurrentBets;
