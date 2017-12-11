'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, Text, ListView, TouchableHighlight, TouchableOpacity, Image } from 'react-native'


class AllPendingWagers extends Component {
  constructor(props) {
    super(props);

    var getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
    }

    var getRowData = (dataBlob, sectionID, rowID) => {
        return dataBlob[sectionID + ':' + rowID];
    }

    this.state = {
        isLoading : true,
        dataSource : new ListView.DataSource({
            getSectionData          : getSectionData,
            getRowData              : getRowData,
            rowHasChanged           : (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        })
      }
  }


  componentDidMount() {
       this.fetchData();
   }

   fetchData() {
     var fetchString = 'http://linkapp.mywire.org:3000/reporting/all_pending';
     fetch(fetchString)
     .then((response) => response.json())
     .then((responseData) => {
       var dataBlob = {},
         sectionIDs = [],
         rowIDs = [],
         i, len;

       len = responseData.length;

       for(i = 0; i < len; i++) {
        var wager = responseData[i];

         if (sectionIDs.indexOf(wager.sport) == -1) {
           sectionIDs.push(wager.sport);
           dataBlob[wager.sport] = wager.sport;
         }
       }

       var numOfSections = sectionIDs.length;

       for(i = 0; i < numOfSections; i++) {
         rowIDs[i] = [];
       }

       for(i = 0; i < len; i++) {
         var wager = responseData[i];
         var rowIndex = sectionIDs.indexOf(wager.sport);
         rowIDs[rowIndex].push(wager.ticket);
         dataBlob[wager.sport + ":" + wager.ticket] = wager;
       }

       this.setState({
         dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
         isLoading: false
       });
     })
     .done();
   }

   render() {
     return (
       <View style={{justifyContent:'center', flex:1}}>
         <ListView
           style={styles.listView}
           dataSource={this.state.dataSource}
           renderRow={this.renderRow.bind(this)}
           renderSectionHeader={this.renderSectionHeader.bind(this)}
         />

       </View>
     );
   }


   renderSectionHeader(sectionData, sectionID) {
         return (
             <View style={styles.sectionContainer}>
                 <Text style={styles.sectionText}>{sectionData}</Text>
             </View>
         );
     }

     renderRow(rowData, sectionID, rowID) {
       if (sectionID == "Baseball") {
         return(
           <View style={{flex:1, flexDirection:'column', borderBottomWidth:1, borderColor:'black', padding:10, backgroundColor:'snow'}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
              <Text style={styles.mlbGameText}>{rowData.team}</Text>
              <Text style={styles.mlbGameText}>{rowData.odds}</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-start'}}>
              <Text style={styles.mlbGameText}>Accepted: {new Date(rowData.accepted).toLocaleDateString()}</Text>
            </View>
           </View>

         )
       }
       else if (sectionID == "MLB Season Wins") {
          return (
            <View style={rowData.over_under == "Under" ? styles.seasonUnder : styles.seasonOver}>
              <View style={styles.seasonRow}>

                <Text style={styles.seasonText}>{rowData.team}</Text>

                <Text style={styles.seasonText}>{rowData.over_under}</Text>

              </View>
              <View style={styles.seasonRow}>

                <Text style={styles.seasonText}>Wins: {rowData.wager}</Text>

                <Text style={styles.seasonText}>Risk: {rowData.risk}</Text>

              </View>
              <View style={styles.seasonRow}>
                <Text style={styles.seasonText}>Odds: {rowData.odds}</Text>
                <Text style={styles.seasonText}>Reward: {rowData.reward}</Text>
              </View>
            </View>

          )
        }

        return(
            <View>
              <Text>Here</Text>
            </View>
        )

      }



}


export default AllPendingWagers;




const styles = StyleSheet.create({

 listView: {
       backgroundColor: 'white'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },


  sectionContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  sectionText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 8,
    color: 'white',
    fontFamily:'cochin',
    letterSpacing:.6
  },
  mlbGameText: {
    fontSize: 17,
    textAlign:'center',
    margin:5,
    color:'black',
    fontFamily:'cochin',
    letterSpacing:.6,
    fontWeight:'400'
  },
  seasonOver: {
    flex:1,
    flexDirection:'column',

    padding:10,
    borderBottomWidth:2,
    borderColor:'black',
    backgroundColor:'honeydew'

  },
  seasonUnder: {
    flex:1,
    flexDirection:'column',

    padding:10,
    borderBottomWidth:2,
    borderColor:'black',
    backgroundColor:'papayawhip'
  },
  seasonRow: {
    flex:1,
    flexDirection:'row',

    padding:5,
    justifyContent:'space-between'

  },
  seasonText:{
    fontSize:17,
    fontFamily:'cochin',
    letterSpacing:.6,
    fontWeight:'400',


  },


});
