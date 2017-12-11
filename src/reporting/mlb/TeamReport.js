'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, Text, ListView, TouchableHighlight, TouchableOpacity, Image, ActivityIndicator } from 'react-native'


class TeamReport extends Component {
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

  componentDidMount(){
    this.fetchData();
  }


  fetchData() {
    var networkTeamName = this.makeUrlString(this.props.team_name);
    var fetchString = 'http://linkapp.mywire.org:3000/reporting/mlb/byTeam/' + networkTeamName;
    fetch(fetchString)
    .then((response) => response.json())
    .then((responseData) => {
      var dataBlob = {},
        sectionIDs = [],
        rowIDs = [],
        i, len;

      var individualGames = responseData[0];
      var pitcherData = responseData[1];

      sectionIDs.push("Season Data");
      sectionIDs.push("Pitcher Data");
      sectionIDs.push("Individual Games");

      dataBlob["Season Data"] = "Season Data";
      dataBlob['Pitcher Data'] = "Pitcher Data";
      dataBlob["Individual Games"] = "Individual Games";

      rowIDs[0]=[];
      rowIDs[1]=[];
      rowIDs[2]=[];

      var gamesLen = individualGames.length;

      for(i = 0; i < gamesLen; i++) {
       var wager = individualGames[i];
        rowIDs[2].push(wager.ticket);
        dataBlob["Individual Games:" + wager.ticket] = wager;

      }

      var pitcherLen = pitcherData.length;

      for(i = 0; i < pitcherLen; i++){
        var pitcher = pitcherData[i];
        rowIDs[1].push(pitcher.starter);
        dataBlob["Pitcher Data:" + pitcher.starter] = pitcher;
      }

      var seasonData = [];

      seasonData.push(responseData[2][0]["count(win)"]);
      seasonData.push(responseData[3][0]["count(win)"]);
      seasonData.push(responseData[4][0]["avg(clv)"]);
      seasonData.push(responseData[5][0]["away"]);
      seasonData.push(responseData[6][0]["home"]);
      seasonData.push(responseData[7][0]["favs"]);
      seasonData.push(responseData[8][0]["dogs"]);
      seasonData.push(responseData[9][0]["av"]);
      seasonData.push(responseData[10][0]['sum(net)']);

      rowIDs[0].push("1");
      dataBlob["Season Data:1"] = seasonData;

      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        isLoading: false
      });
    })
    .done();
  }


  renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>{sectionData}</Text>
            </View>
        );
    }


    renderRow(rowData, sectionID, rowID) {
      if(sectionID == "Season Data") {
        var avgLine = rowData[7];
        if (avgLine < 0) {
          avgLine -= 100;
        }
        else {
          avgLine += 100;
        }
        var avgLineCleaned = avgLine.toFixed(2);
        return (
          <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
            <View style={styles.overallRow}>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Net</Text>
                <Text style={styles.overallTextContent}>{rowData[8]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Wins</Text>
                <Text style={styles.overallTextContent}>{rowData[0]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Losses</Text>
                <Text style={styles.overallTextContent}>{rowData[1]}</Text>
              </View>
            </View>
            <View style={styles.overallRow}>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Average CLV</Text>
                <Text style={styles.overallTextContent}>{rowData[2] ? rowData[2].toFixed() : 0.00}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Favorites</Text>
                <Text style={styles.overallTextContent}>{rowData[5]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Dogs</Text>
                <Text style={styles.overallTextContent}>{rowData[6]}</Text>
              </View>
            </View>
            <View style={styles.overallRow}>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Avg Line</Text>
                <Text style={styles.overallTextContent}>{avgLineCleaned}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Home</Text>
                <Text style={styles.overallTextContent}>{rowData[4]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Away</Text>
                <Text style={styles.overallTextContent}>{rowData[3]}</Text>
              </View>
            </View>
          </View>
        )
      }
      else if (sectionID == "Pitcher Data") {
        return (
          <View style={{flex:1, flexDirection:'column', borderBottomWidth:3, borderColor:'black', padding:10}}>
            <View style={{flex:1, alignItems:'center'}}>
              <Text style={styles.overallTextContent}>{rowData.starter}</Text>
            </View>
            <View style={styles.overallRow}>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Net</Text>
                <Text style={styles.overallTextContent}>{rowData["sum(net)"]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Count</Text>
                <Text style={styles.overallTextContent}>{rowData["count(*)"]}</Text>
              </View>
            </View>
            <View style={styles.overallRow}>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Avg CLV</Text>
                <Text style={styles.overallTextContent}>{rowData["avg(clv)"]}</Text>
              </View>
              <View style={styles.overallBox}>
                <Text style={styles.overallTextLabel}>Avg Line</Text>
                <Text style={styles.overallTextContent}>{rowData["avg(odds)"]}</Text>
              </View>
            </View>
          </View>
        )

      }
      else {
          return (
            <View style={rowData.win == 1 ? styles.gameBoxWin : rowData.win == -1 ? styles.gameBoxLose : styles.gameBoxCanceled}>
              <View>
                <Text>{this.dateStr(rowData.game_date)}</Text>
              </View>
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

     dateStr(date) {
       return new Date(date).toLocaleDateString();
     }


  makeUrlString(name) {
    var retStr = name.replace(" ", "_");
    return retStr;

  }


  render () {

      return(

        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
        />

      );

  }
}

export default TeamReport;



const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 200,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  seasonRow : {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    padding:5
  },
  seasonBox: {
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    padding:10
  },
  seasonTextLabel : {
    fontSize:20,
    textDecorationLine:'underline',
    fontFamily:'cochin',
  },
  seasonTextContent: {
    fontSize:20,
    fontFamily:'cochin',
    paddingTop:4,
  },
  listView: {
        backgroundColor: 'snow',
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
    },

  separator: {
       height: 2,
       backgroundColor: 'black'
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
   listView: {
         backgroundColor: 'ghostwhite'
     },
});
