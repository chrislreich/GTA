/*
This file contains the MLBLines class
which renders a ListView of all MLB
lines available on BetOnline. Each
row is touchable to bring the user to
and individual game screen displaying
more detailed information
*/


'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, Text, ListView, TouchableHighlight, TouchableOpacity, Image, RefreshControl } from 'react-native'


// Import Individual Game Page Class
import GamePage from './GamePage';



// Dictionary to look up team logos
var TEAM_LOGOS = { // AL East
                  "Boston Red Sox": require("../mlb_logos/red_sox.gif"),
                  "Baltimore Orioles": require("../mlb_logos/orioles.gif"),
                  "Tampa Bay Rays": require("../mlb_logos/rays.gif"),
                  "Toronto Blue Jays": require("../mlb_logos/blue_jays.gif"),
                  "New York Yankees": require("../mlb_logos/yankees.gif"),
                  // AL Central
                  "Detroit Tigers": require("../mlb_logos/tigers.gif"),
                  "Cleveland Indians": require("../mlb_logos/indians.gif"),
                  "Kansas City Royals": require("../mlb_logos/royals.gif"),
                  "Minnesota Twins": require("../mlb_logos/twins.gif"),
                  "Chicago White Sox": require("../mlb_logos/white_sox.gif"),
                  // AL West
                  "Los Angeles Angels": require("../mlb_logos/angels.gif"),
                  "Oakland Athletics": require("../mlb_logos/as.gif"),
                  "Seattle Mariners": require("../mlb_logos/mariners.gif"),
                  "Houston Astros": require("../mlb_logos/astros.gif"),
                  "Texas Rangers": require("../mlb_logos/rangers.gif"),
                  // NL East
                  "Atlanta Braves": require("../mlb_logos/braves.gif"),
                  "Washington Nationals": require("../mlb_logos/nationals.gif"),
                  "New York Mets": require("../mlb_logos/mets.gif"),
                  "Miami Marlins": require("../mlb_logos/marlins.gif"),
                  "Philadelphia Phillies": require("../mlb_logos/phillies.gif"),
                  // NL Central
                  "Cincinnati Reds": require("../mlb_logos/reds.gif"),
                  "Chicago Cubs": require("../mlb_logos/cubs.gif"),
                  "Pittsburgh Pirates": require("../mlb_logos/pirates.gif"),
                  "St. Louis Cardinals": require("../mlb_logos/cardinals.gif"),
                  "Milwaukee Brewers": require("../mlb_logos/brewers.gif"),
                  // NL West
                  "San Francisco Giants": require("../mlb_logos/giants.gif"),
                  "Los Angeles Dodgers": require("../mlb_logos/dodgers.gif"),
                  "Arizona Diamondbacks": require("../mlb_logos/diamondbacks.gif"),
                  "San Diego Padres": require("../mlb_logos/padres.gif"),
                  "Colorado Rockies": require("../mlb_logos/rockies.gif")
}



class MLBLines extends Component{
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
        refreshing: false,
        dataSource : new ListView.DataSource({
            getSectionData          : getSectionData,
            getRowData              : getRowData,
            rowHasChanged           : (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        })
      }

     this.fetchData = this.fetchData.bind(this);

  }


  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();

  }


   renderRow(rowData, sectionID, rowID) {
            return (
                <TouchableHighlight onPress={() => {
                  this.props.navigator.push({
                    title: "Game Page",
                    component: GamePage,
                    passProps: {
                      gameID:rowData.id,
                      h1_name:rowData.h1_name.split(" - ")[0],
                      h2_name:rowData.h2_name.split(" - ")[0],
                      h1_starter:rowData.h1_starter,
                      h2_starter:rowData.h2_starter,
                      team_on:rowData.team,
                      odds_on:rowData.odds,
                      away_id:rowData.h1_id,
                      home_id:rowData.h2_id,
                    }
                  })
                }}>
                    <View>
                      <View style={styles.container}>
                        <View style={{height:90, width:140, justifyContent:'center', alignItems:'center'}}>
                          <Image style={styles.thumb} source={TEAM_LOGOS[rowData.h1_name.split(" - ")[0]]} />
                          <Text style={{fontSize:13, paddingTop:4, textAlign:'center'}}>{rowData.h1_starter}</Text>
                          <Text style={{fontSize:14, textAlign:'center', padding:1}}>{this.gameLineToString(rowData.h1_line)}</Text>
                        </View>
                        <View>
                          <Text style={{textAlign:'center', fontSize:12}}>{this.gameTimeToString(rowData.timeOfGame)}</Text>
                          <Text style={{textAlign:'center', fontSize:9, color:'dodgerblue', padding:5}}>{this.betOnString(rowData.team, rowData.odds)}</Text>
                        </View>
                        <View style={{height:90, width:140, justifyContent: 'center', alignItems:'center'}}>
                          <Image style={styles.thumb} source={TEAM_LOGOS[rowData.h2_name.split(" - ")[0]]} />
                          <Text style={{fontSize:13, paddingTop:4, textAlign:'center'}}>{rowData.h2_starter}</Text>
                          <Text style={{fontSize:14, textAlign:'center', padding:1}}>{this.gameLineToString(rowData.h2_line)}</Text>
                        </View>
                      </View>
                      <View style={styles.separator} />
                    </View>
                </TouchableHighlight>
            );
      }


  componentDidMount() {
       this.fetchData();
   }

   fetchData() {
       fetch('http://linkapp.mywire.org:3000/mlb/active_lines')
       .then((response) => response.json())
       .then((responseData) => {
          var games = responseData,
              length = games.length,
              dataBlob = {},
              sectionIDs = [],
              rowIDs = [],
              individualGame,
              iGame,
              i,
              j,
              k;

          for (i = 0; i < length; i++) {
            individualGame = games[i];

            if (sectionIDs.indexOf(String(individualGame.dateOfGame)) == -1) {
              sectionIDs.push(String(individualGame.dateOfGame));
              dataBlob[String(individualGame.dateOfGame)] = String(individualGame.dateOfGame);
            }
          }
          var numOfDates = sectionIDs.length;

          for (j = 0; j < numOfDates; j++) {
            rowIDs[j] = [];
          }

          for (k = 0; k < length; k++) {
            iGame = games[k];
            var rowIndex = sectionIDs.indexOf(String(iGame.dateOfGame));
            rowIDs[rowIndex].push(String(iGame.id));
            dataBlob[String(iGame.dateOfGame) + ":" + String(iGame.id)] = iGame;
          }

          this.setState({
               dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
               isLoading: false,
               refreshing:false,
           });
       })
       .done();
   }


  render() {
    return (
      <View style={{justifyContent:'center'}}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        />
      </View>
    );
  }


  renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>{new Date(sectionData).toDateString()}</Text>
            </View>
        );
    }


  gameLineToString(line) {
    var tempStr = String(line);
    if (tempStr.charAt(0) == "-"){
      return tempStr;
    }
    else {
      return "+" + tempStr;
    }
  }

  gameTimeToString(time) {
    var splArr = time.split(":");
    var hour = parseInt(splArr[0]);
    var minute = splArr[1];

    var ps;

    if (hour > 11) {
      ps = "PM";
      hour = hour - 12;
      if (hour == 0){
        hour = 12;
      }
    }
    else {
      ps = "AM";
      if (hour == 0) {
        hour = 12;
      }
    }

  return String(hour) + ":" + minute + " " + ps;
}

  betOnString(team, odds) {
    if (!team || !odds) {
      return "";
    }
    else {
      return "Bet On\n" + team + "\n" + "at " + this.gameLineToString(odds);
    }
  }


  renderLoadingView() {
    return (
        <View style={styles.loading}>
            <ActivityIndicatorIOS
                size='large'/>
            <Text>
                Loading Games...
            </Text>
        </View>
    );
}
};





const styles = StyleSheet.create({
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

  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5

  },
  leftContainer: {
    paddingLeft: 2,
  },
  rightContainer:
  {
    paddingRight: 2,
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  rowContainer: {
    flex:1,
        width: 100,
        height: 80,

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



export default MLBLines;
