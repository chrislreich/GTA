'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, Text, ListView, TouchableHighlight, TouchableOpacity, Image } from 'react-native'


var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

class TodayMLB extends Component {
  constructor(props) {
    super(props);

    // Get Sections for ListView
    var getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
    }

    // Get Rows for ListView
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
     var fetchString = 'http://linkapp.mywire.org:3000/reporting/mlb/today';
     fetch(fetchString)
     .then((response) => response.json())
     .then((responseData) => {
       var dataBlob = {},
         sectionIDs = [],
         rowIDs = [],
         i, len,
         dayNet = 0.00,
         dayWins = 0,
         dayLoss = 0,
         avgClv = 0.0,
         numFavs= 0,
         numDogs = 0,
         cnt = 0,
         clvAccumulator = 0;

       len = responseData[0].length;

       sectionIDs.push("Overall");
       sectionIDs.push("Pending");
       sectionIDs.push("Graded");

       dataBlob["Overall"] = "Overall";
       dataBlob["Pending"] = "Pending";
       dataBlob["Graded"] = "Graded";

       rowIDs[0] = [];
       rowIDs[1] = [];
       rowIDs[2] = [];

       var len2 = responseData[1].length;
       console.log(len2);

       for(i = 0; i < len2; i++) {
         var pending = responseData[1][i];
         rowIDs[1].push(pending.ticket);
         dataBlob["Pending:" + pending.ticket] = pending;
       }



       for(i = 0; i < len; i++) {
        var wager = responseData[0][i];

        rowIDs[2].push(wager.ticket);
        dataBlob['Graded:' + wager.ticket] = wager;

        var outcome = wager.win;

        if (outcome == 1) {
          dayWins += 1;
        }
        else if (outcome == -1) {
          dayLoss += 1;
        }
        else {
          continue;
        }

        cnt += 1;
        dayNet += wager.net;
        clvAccumulator += wager.clv
        if (wager.odds < 0) {
          numFavs += 1;
        }
        else {
          numDogs += 1;
        }
       }




       if (cnt > 0) {
         avgClv = (clvAccumulator / cnt).toFixed(2);
       }

       var dayTotal = [dayNet, dayWins, dayLoss, avgClv, numFavs, numDogs];

       rowIDs[0].push("dayTotal");
       dataBlob["Overall:dayTotal"] = dayTotal;


       this.setState({
         dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
         isLoading: false
       });
     })
     .done();
   }

  render() {
    var today = new Date();
    var fourLess = new Date(today - 3600000*4);
    var dayString = days[fourLess.getDay()];
    return(
      <View style={{flex:1, flexDirection:'column'}}>
        <View style={{height:125, alignItems:'center', paddingTop:70, backgroundColor:'whitesmoke'}}>
          <Text style={{fontSize:40, fontFamily:'cochin', color:'black'}}>{dayString}</Text>
        </View>
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
      if(sectionID == "Overall") {
        return (
          <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
            <View style={styles.overallRow}>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Net</Text>
                <Text style={styles.overallTextContent}>{rowData[0]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Wins</Text>
                <Text style={styles.overallTextContent}>{rowData[1]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Losses</Text>
                <Text style={styles.overallTextContent}>{rowData[2]}</Text>
              </View>
            </View>
            <View style={styles.overallRow}>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Average CLV</Text>
                <Text style={styles.overallTextContent}>{rowData[3]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Favorites</Text>
                <Text style={styles.overallTextContent}>{rowData[4]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Dogs</Text>
                <Text style={styles.overallTextContent}>{rowData[5]}</Text>
              </View>
            </View>
          </View>
        )
      }
      else if (sectionID === "Graded") {
          return (
            <View style={rowData.win == 1 ? styles.gameBoxWin : rowData.win == -1 ? styles.gameBoxLose : styles.gameBoxCanceled}>
              <View style={styles.gameRow}>
                <View style={styles.gameBox}>
                  <Text style={styles.overallTextContent}>{rowData.team}</Text>
                </View>
                <View style={styles.gameBox}>
                  <Text style={styles.overallTextContent}>{rowData.starter}</Text>
                </View>
              </View>
              <View style={styles.gameRow}>
                <View style={styles.gameBox}>
                  <Text style={styles.overallTextContent}>{this.homeString(rowData.home)}</Text>
                </View>
              </View>
              <View style={styles.gameRow}>
                <View style={styles.gameBox}>
                  <Text style={styles.overallTextContent}>{rowData.opponent}</Text>
                </View>
                <View style={styles.gameBox}>
                  <Text style={styles.overallTextContent}>{rowData.opponent_starter}</Text>
                </View>
              </View>
              <View style={styles.gameRow}>


                <View style={styles.gameBox}>
                  <Text style={styles.overallTextContent}>{this.winString(rowData.win)}</Text>
                </View>

              </View>
              <View style={styles.gameRow}>
              <View style={styles.gameBox}>
                <Text style={styles.overallTextContent}>Bet: {this.formatOdds(rowData.odds)}</Text>
              </View>
              <View style={styles.gameBox}>
                <Text style={styles.overallTextContent}>Closed: {this.formatOdds(rowData.closing_line)}</Text>
              </View>
              </View>
              <View style={styles.separator} />
            </View>
          )
       }
       else if (sectionID = "Pending") {
         var betOnHome;
         if (rowData.home_flag === 1) betOnHome = false;
         else betOnHome = true;
         return (
           <View style={styles.gameBoxCanceled}>
             <View style={styles.gameRow}>
               <View style={styles.gameBox}>
                 <Text style={styles.overallTextContent}>{betOnHome ? rowData.home : rowData.away}</Text>
               </View>
               <View style={styles.gameBox}>
                 <Text style={styles.overallTextContent}>{betOnHome ? rowData.home_pitcher : rowData.away_pitcher}</Text>
               </View>
             </View>
             <View style={styles.gameRow}>
               <View style={styles.gameBox}>
                 <Text style={styles.overallTextContent}>{this.homeString(rowData.home_flag)}</Text>
               </View>
             </View>
             <View style={styles.gameRow}>
               <View style={styles.gameBox}>
                 <Text style={styles.overallTextContent}>{betOnHome ? rowData.away : rowData.home}</Text>
               </View>
               <View style={styles.gameBox}>
                 <Text style={styles.overallTextContent}>{betOnHome ? rowData.away_pitcher : rowData.home_pitcher}</Text>
               </View>
             </View>

             <View style={styles.gameRow}>
               <View style={styles.gameBox}>
                 <Text style={styles.overallTextContent}>Odds: {this.formatOdds(rowData.odds)}</Text>
               </View>

             </View>
             <View style={styles.separator} />
           </View>
         );
       }

     }

     formatOdds(line) {
       if (line < 0) {
         return String(line);
       }
       else{
         return "+" + String(line);
       }
     }

     homeString(home) {
       if (home == 2) {
         return "vs.";
       }
       else {
         return "@";
       }
     }

     winString(win) {
       if (win == 1) {
         return "Win";
       }
       else if (win == -1) {
         return "Loss";
       }
       else {
         return "Canceled"
       }
     }






}





export default TodayMLB;



const styles = StyleSheet.create({

 thumb: {
   width: 75,
   height:50,
   padding:1.
 },

 listView: {
       backgroundColor: 'snow',
   },
  sectionContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  sectionText: {
    fontSize: 22,
    textAlign: 'center',
    margin: 8,
    color: 'white',
    fontFamily:'cochin'
  },
  separator: {
       height: 2,
       backgroundColor: 'black'
   },
   overallRow:{
     flex:1,
     flexDirection:'row',
     alignItems:'center'
   },
   overallBox:{
     flex:1,
     flexDirection:'column',
     alignItems:'center',
     padding:5
   },
   overallTextLabel : {
     fontSize:20,
     textDecorationLine:'underline',
     fontFamily:'cochin',
   },
   overallTextContent: {
     fontSize:20,
     fontFamily:'cochin',
     paddingTop:4,
   },
   gameBoxWin: {
     flex:1,
     flexDirection:'column',
     alignItems:'center',
     backgroundColor:"honeydew",
     borderBottomWidth:3,
     borderColor:'black',
     padding:10
   },
   gameBoxLose: {
     flex:1,
     flexDirection:'column',
     alignItems:'center',
     backgroundColor:"mistyrose",
     borderBottomWidth:3,
     borderColor:'black',
     padding:10
   },
   gameBoxCanceled: {
     flex:1,
     flexDirection:'column',
     alignItems:'center',
     backgroundColor:"snow",
     borderBottomWidth:3,
     borderColor:'black',
     padding:10
   },
   gameRow: {
     flex:1,
     flexDirection:'row',
     alignItems:'center',
   },
   gameBox: {
     flex:1,
     alignItems:'center',
   }

});
