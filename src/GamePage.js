'use strict'

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, AlertIOS, ActivityIndicatorIOS, ListView, TouchableHighlight, Image, Button, Modal, ScrollView, TouchableWithoutFeedback
} from 'react-native';

import BetWebView from './BetWebView';
import GameWebView from './GameWebView';
import FangraphsTeamPage from './FangraphsTeamPage';
import LineGraph from './lineGraph/LineGraph';
import LineupModal from './LineupModal';




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


var FANGRAPHS_PAGE = {
                  "Boston Red Sox": "redsox",
                  "Baltimore Orioles": "orioles",
                  "Tampa Bay Rays": "rays",
                  "Toronto Blue Jays": "bluejays",
                  "New York Yankees": "yankees",
                  // AL Central
                  "Detroit Tigers": "tigers",
                  "Cleveland Indians": "indians",
                  "Kansas City Royals": "royals",
                  "Minnesota Twins": "twins",
                  "Chicago White Sox": "whitesox",
                  // AL West
                  "Los Angeles Angels": "angels",
                  "Oakland Athletics": "athletics",
                  "Seattle Mariners": "mariners",
                  "Houston Astros": "astros",
                  "Texas Rangers": "rangers",
                  // NL East
                  "Atlanta Braves": "braves",
                  "Washington Nationals": "nationals",
                  "New York Mets": "mets",
                  "Miami Marlins": "marlins",
                  "Philadelphia Phillies": "phillies",
                  // NL Central
                  "Cincinnati Reds": "reds",
                  "Chicago Cubs": "cubs",
                  "Pittsburgh Pirates": "pirates",
                  "St. Louis Cardinals": "cardinals",
                  "Milwaukee Brewers": "brewers",
                  // NL West
                  "San Francisco Giants": "giants",
                  "Los Angeles Dodgers": "dodgers",
                  "Arizona Diamondbacks": "diamondbacks",
                  "San Diego Padres": "padres",
                  "Colorado Rockies": "rockies"
}

export default class GamePage extends Component {
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
        graphData :[],
        wagerTime: undefined,

        dataSource1 : new ListView.DataSource({
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
    var fetchString = 'http://linkapp.mywire.org:3000/mlb/' + String(this.props.gameID);
    fetch(fetchString)
    .then((response) => response.json())
    .then((responseData) => {
      var dataBlob = {},
        sectionIDs1 = [],
        rowIDs1 = [],
        moneyLineData = {},
        lineupData = [],
        openingLineData = responseData[1],
        currentLineData = responseData[2],
        awayBullpen = [],
        homeBullpen = [],
        dateInfo = responseData[5],
        awayBullpenName = this.props.h1_name + " Bullpen",
        homeBullpenName = this.props.h2_name + " Bullpen",
        lineInfo = responseData[6],
        wagerTime = responseData[7],
        catcherAndDefenseData = [];

        lineupData.push(responseData[0]);


        var batterCurrent,
        batterProj,
        starterCurrent,
        starterProj,
        bullpenCurrent,
        bullpenProj;


        if (responseData[10] == undefined) {
          batterCurrent = [];
        }
        else {
          batterCurrent = responseData[10];
        }


        if (responseData[11] == undefined) {
          batterProj = [];
        }
        else {
          batterProj = responseData[11];
        }



        if (responseData[12] == undefined) {
          starterCurrent = [];
        }
        else {
          starterCurrent = responseData[12];
        }

        if (responseData[13] == undefined) {
          starterProj = [];
        }
        else {
          starterProj = responseData[13];
        }

        lineupData.push(batterCurrent);
        lineupData.push(batterProj);
        lineupData.push(starterCurrent);
        lineupData.push(starterProj);



        if (responseData[14] == undefined) {
          bullpenCurrent = [];
        }
        else {
          bullpenCurrent = responseData[14];
        }

        if (responseData[15] == undefined) {
          bullpenProj = [];
        }
        else {
          bullpenProj = responseData[15];
        }





        catcherAndDefenseData.push(responseData[8]);
        catcherAndDefenseData.push(responseData[9]);



        awayBullpen.push(responseData[3]);
        awayBullpen.push(dateInfo);
        awayBullpen.push(bullpenCurrent)
        awayBullpen.push(bullpenProj)



        homeBullpen.push(responseData[4]);
        homeBullpen.push(dateInfo);
        homeBullpen.push(bullpenCurrent)
        homeBullpen.push(bullpenProj)


        moneyLineData["away_opening_line"] = openingLineData[0]["away_opening"];
        moneyLineData["away_current_line"] = currentLineData[0]["away_now"];
        moneyLineData["home_opening_line"] = openingLineData[0]["home_opening"];
        moneyLineData["home_current_line"] = currentLineData[0]["home_now"];

        sectionIDs1.push("Lineups");
        sectionIDs1.push(awayBullpenName);
        sectionIDs1.push(homeBullpenName);
        sectionIDs1.push("Catching And Defense");
        sectionIDs1.push("Money Line Data");

        dataBlob["Lineups"] = "Lineups";
        dataBlob[awayBullpenName] = awayBullpenName;
        dataBlob[homeBullpenName] = homeBullpenName;
        dataBlob["Catching And Defense"] = "Catching And Defense";
        dataBlob["Money Line Data"] = "Money Line Info";

        rowIDs1[0] = [];
        rowIDs1[1] = [];
        rowIDs1[2] = [];
        rowIDs1[3] = []
        rowIDs1[4] = [];

        rowIDs1[0].push("1");
        rowIDs1[1].push("1");
        rowIDs1[2].push("1");
        rowIDs1[3].push("1");
        rowIDs1[4].push("2");

        dataBlob["Lineups:1"] = lineupData;
        dataBlob[awayBullpenName + ":1"] = awayBullpen;
        dataBlob[homeBullpenName + ":1"] = homeBullpen;
        dataBlob["Catching And Defense:1"] = catcherAndDefenseData;
        dataBlob["Money Line Data:2"] = moneyLineData;

        var len = lineInfo.length;
        var cleanedLineInfo = [];

        for(var m = 0; m < len; m++){
          var line = lineInfo[m];
          var lineDate = line.date;
          var lineValue = line.value;
          cleanedLineInfo.push({"date": new Date(lineDate), "value":lineValue});
        }

        var wagerDate = undefined;

        if (wagerTime.length > 0) {
          wagerDate = new Date(wagerTime[0]['accepted'])

        }




      this.setState({
        dataSource1: this.state.dataSource1.cloneWithRowsAndSections(dataBlob, sectionIDs1, rowIDs1),
        graphData:cleanedLineInfo,
        wagerTime:wagerDate,
        isLoading: false
      })
    })
    .done();
  }



  render() {



    return (
      <ListView
          style={styles.listView}
          dataSource={this.state.dataSource1}
          renderRow={this.renderRow.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
        />
    );
  }


  renderRow(rowData, sectionID, rowID) {
      if (sectionID == "Lineups") {

        var h1_starterCurrData = {}, h1_starterProjData = {}, h2_starterCurrData = {}, h2_starterProjData = {};
        var k;
        for(k = 0; k < rowData[3].length; k++) {
          if (rowData[3][k].name === this.props.h1_starter) {
            h1_starterCurrData = rowData[3][k];
          }

          if (rowData[3][k].name == this.props.h2_starter){
            h2_starterCurrData = rowData[3][k];
          }
        }

        for(k = 0; k < rowData[4].length; k++) {
          if (rowData[4][k].name === this.props.h1_starter) {
            h1_starterProjData = rowData[4][k];
          }

          if (rowData[4][k].name == this.props.h2_starter){
            h2_starterProjData = rowData[4][k];
          }
        }

        return (
               <View style={styles.lineupContainer}>
                <View style={styles.singleLineupContainer}>
                      <TouchableOpacity style={{backgroundColor:'white', padding:3}} onPress={() => {
                        this.props.navigator.push({
                          title: 'Fangraphs',
                          component: FangraphsTeamPage,
                          passProps: {
                            fangraphs_team:FANGRAPHS_PAGE[this.props.h1_name]
                          }
                        })
                      }}>
                        <Image style={styles.thumb} source={TEAM_LOGOS[this.props.h1_name]} />
                      </TouchableOpacity>
                      <LineupModal starter={true} home={false} player={this.props.h1_starter} nav={this.props.navigator} currentData={h1_starterCurrData} projData={h1_starterProjData}/>
                      <View style={styles.separator} />
                      <View style={styles.nineGuysContainer}>
                        {this.getAwayLineupStr(rowData[0], this.props.navigator, rowData[1], rowData[2])}
                      </View>
                    </View>
                    <View style={styles.singleLineupContainer}>
                      <TouchableOpacity style={{backgroundColor:'white', padding:3}} onPress={() => {
                        this.props.navigator.push({
                          title: 'Fangraphs',
                          component: FangraphsTeamPage,
                          passProps: {
                            fangraphs_team:FANGRAPHS_PAGE[this.props.h2_name]
                          }
                        })
                      }}>
                        <Image style={styles.thumb} source={TEAM_LOGOS[this.props.h2_name]} />
                      </TouchableOpacity>
                      <LineupModal starter={true} home={true} player={this.props.h2_starter} nav={this.props.navigator} currentData={h2_starterCurrData} projData={h2_starterProjData}/>
                      <View style={styles.separator} />
                      <View style={styles.nineGuysContainer}>
                        {this.getHomeLineupStr(rowData[0], this.props.navigator, rowData[1], rowData[2])}
                      </View>
                    </View>
                 </View>
               );
           }
           else if (sectionID == "Money Line Data"){
             return(
              <View>
               <View style={styles.moneylineContainer}>
                 <View style={styles.individualMoneylineContainer}>
                    <View>
                      <Text style={{textDecorationLine:'underline', fontSize:16}}>Opening Line</Text>
                      <Text style={{textAlign:'center', fontSize:16}}>{this.formatLine(rowData.away_opening_line)}</Text>
                    </View>
                    <View>
                      <Text style={{textDecorationLine:'underline', fontSize:16}}>Current Line</Text>
                      <Text style={{textAlign:'center', fontSize:16}}>{this.formatLine(rowData.away_current_line)}</Text>
                    </View>
                </View>
                <View style={styles.individualMoneylineContainer}>
                    <View>
                      <Text style={{textDecorationLine:'underline', fontSize:16}}>Opening Line</Text>
                      <Text style={{textAlign:'center', fontSize:16}}>{this.formatLine(rowData.home_opening_line)}</Text>
                    </View>
                    <View>
                      <Text style={{textDecorationLine:'underline', fontSize:16}}>Current Line</Text>
                      <Text style={{textAlign:'center', fontSize:16}}>{this.formatLine(rowData.home_current_line)}</Text>
                    </View>
                </View>
              </View>
              <View>
                <Text style={{textAlign:'center', color: 'dodgerblue', fontSize:15, padding:10}}>{this.pendingWagerStr(this.props.odds_on, this.props.team_on)}</Text>
              </View>
              <View style={{flex:3, paddingBottom:5,}}>
                <LineGraph lineMovement={this.state.graphData} wagerPlaced={this.state.wagerTime} wagerOdds={this.props.odds_on} wagerTeam={this.props.team_on} homeTeam={this.props.h2_name}/>
              </View>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', backgroundColor:'maroon'}}>
                <TouchableOpacity style={{backgroundColor:'maroon', flex:1, flexDirection:'column', justifyContent:'space-around'}}
                                  onPress={() => {
                                    this.props.navigator.push({
                                          title: "Login",
                                          component: BetWebView,
                                        })
                                      }}
                  >
                    <Text style={{fontSize:18, color:'black', fontWeight:'600', textAlign:'center', padding:12}}>Bet Online Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'maroon', flex:1, flexDirection:'column', justifyContent:'space-around'}}
                                  onPress={() => {
                                    this.props.navigator.push({
                                          title: "BetOnline",
                                          component: GameWebView,
                                          passProps:{
                                            url_id:this.props.home_id
                                          }
                                        })
                                      }}
                  >
                    <Text style={{fontSize:18, color:'black', fontWeight:'600', textAlign:'center', padding:12}}>Bet Game</Text>
                </TouchableOpacity>

              </View>

          
            </View>
             )
           }
           else if (sectionID == (this.props.h1_name + " Bullpen")){
             return (
             <View style={{flexDirection:'column'}}>
              <View style={{flexDirection:'row', padding:5}}>
                <View style={{flex:5}}>
                  <Text></Text>
                </View>
                <View style={{flex:1}}>
                  <Text>{rowData[1][0].day0}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text>{rowData[1][0].day1}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text>{rowData[1][0].day2}</Text>
                </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:5, paddingLeft:12}}>
                  {this.bullpenPitcherStr(rowData[0], this.props.navigator, rowData[2], rowData[3])}
                </View>
                <View style={{flex:1,}}>
                  {this.bullpenCountStr(rowData[0], 0)}
                </View>
                <View style={{flex:1,}}>
                  {this.bullpenCountStr(rowData[0], 1)}
                </View>
                <View style={{flex:1,}}>
                  {this.bullpenCountStr(rowData[0], 2)}
                </View>
              </View>
             </View>
           );
           }
           else if (sectionID == (this.props.h2_name + " Bullpen")){
             return (
             <View style={{flexDirection:'column'}}>
              <View style={{flexDirection:'row', padding:5}}>
                <View style={{flex:5}}>
                  <Text></Text>
                </View>
                <View style={{flex:1}}>
                  <Text>{rowData[1][0].day0}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text>{rowData[1][0].day1}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text>{rowData[1][0].day2}</Text>
                </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:5, paddingLeft:12}}>
                  <View>
                    {this.bullpenPitcherStr(rowData[0], this.props.navigator, rowData[2], rowData[3])}
                  </View>
                </View>
                <View style={{flex:1,}}>
                  {this.bullpenCountStr(rowData[0], 0)}
                </View>
                <View style={{flex:1,}}>
                  {this.bullpenCountStr(rowData[0], 1)}
                </View>
                <View style={{flex:1,}}>
                  {this.bullpenCountStr(rowData[0], 2)}
                </View>
              </View>
             </View>
           );
           }
           else if (sectionID = "Catching And Defense") {
             var cleanedArr = this.restructureCatcherAndDefenseData(rowData, this.props.h1_name);
             var awayArr = cleanedArr[0];
             var homeArr = cleanedArr[1];
             return (
               <View style={{flex:1, flexDirection:'column'}}>
                 <View style={styles.teamDefenseBoxTop}>
                  <View style={styles.individualDefenseBox}>
                    <View style={{flex:3, justifyContent:'center', flexDirection:'column'}}>
                      <Text style={{paddingLeft:3}}>{this.props.h1_name}</Text>
                    </View>
                    <View style={styles.littleDefenseBox}>
                      <Text style={{textDecorationLine:'underline', padding:2}}>Rank</Text>
                      <Text>{awayArr[0]}</Text>
                    </View>
                    <View style={styles.littleDefenseBox}>
                      <Text style={{textDecorationLine:'underline', padding:2}}>PADE</Text>
                      <Text>{awayArr[1]}</Text>
                    </View>
                  </View>
                  <View style={styles.teamCatchingBox}>
                    <View style={styles.individualCatchingBox}>
                      <View style={{flex:3, alignItems:'flex-start'}}>
                        <Text></Text>
                      </View>
                      <View style={{flex:1, alignItems:'flex-start'}}>
                        <Text style={{textDecorationLine:'underline'}}>Sample</Text>
                      </View>
                      <View style={{flex:1, alignItems:'flex-start'}}>
                        <Text style={{textDecorationLine:'underline'}}>Per Game</Text>
                      </View>
                    </View>
                    {this.createCatcherRows(awayArr[2])}
                  </View>
                 </View>
                 <View style={styles.teamDefenseBoxBottom}>
                   <View style={styles.individualDefenseBox}>
                   <View style={{flex:3, justifyContent:'center', flexDirection:'column'}}>
                     <Text style={{paddingLeft:3}}>{this.props.h2_name}</Text>
                   </View>
                   <View style={styles.littleDefenseBox}>
                     <Text style={{textDecorationLine:'underline', padding:2}}>Rank</Text>
                     <Text>{homeArr[0]}</Text>
                   </View>
                   <View style={styles.littleDefenseBox}>
                     <Text style={{textDecorationLine:'underline', padding:2}}>PADE</Text>
                     <Text>{homeArr[1]}</Text>
                   </View>
                   </View>
                   <View style={styles.teamCatchingBox}>
                    <View style={styles.individualCatchingBox}>
                      <View style={{flex:3, alignItems:'flex-start'}}>
                        <Text></Text>
                      </View>
                      <View style={{flex:1, alignItems:'flex-start'}}>
                        <Text style={{textDecorationLine:'underline'}}>Sample</Text>
                      </View>
                      <View style={{flex:1, alignItems:'flex-start'}}>
                        <Text style={{textDecorationLine:'underline'}}>Per Game</Text>
                      </View>
                    </View>
                    {this.createCatcherRows(homeArr[2])}
                   </View>
                 </View>
               </View>
             )
           }
           else {
           return (
                  <View>
                    <View style={styles.container}>
                    </View>
                  </View>

           );
         }

   }

     renderSectionHeader(sectionData, sectionID) {
           return (
               <View style={styles.sectionContainer}>
                   <Text style={styles.sectionText}>{sectionData}</Text>
               </View>
           );
       }


       getAwayLineupStr(inpt, navi, batterCurrent, batterProj) {

         if (inpt.length == 0){
           return <Text>Lineup Unavailable</Text>;
         }
         else {
           var dict = inpt[0];
           var away_lineup = dict["away_lineup"];
           if (away_lineup.length == 0) {
             return <Text>Lineup Not Posted Yet</Text>;
           }
           else {
             var splArr = away_lineup.split("^");

             var lines = splArr.map(function(line, i) {
                     var tempCurrData = {}, tempProjData = {};

                     var j;
                     for (j = 0; j < batterCurrent.length; j++) {
                       if (line === batterCurrent[j].name) {
                         tempCurrData = batterCurrent[j];
                         break;
                       }
                     }

                     for (j = 0; j < batterProj.length; j++) {
                       if (line == batterProj[j].name) {
                         tempProjData = batterProj[j];
                         break;
                       }
                     }

                     return (
                       <LineupModal key={i} starter={false} home={false} player={line} nav={navi} currentData={tempCurrData} projData={tempProjData}/>
                     );
                   });
            return lines;
           }
         }
       }

       getHomeLineupStr(inpt, navi, batterCurrent, batterProj) {
         if (inpt.length == 0){
           return <Text>Lineup Unavailable</Text>;
         }
         else {
           var dict = inpt[0];
           var home_lineup = dict["home_lineup"];
           if (home_lineup.length == 0) {
             return <Text>Lineup Not Posted Yet</Text>;
           }
           else {
             var splArr = home_lineup.split("^");

             var lines = splArr.map(function(line, i) {
               var tempCurrData = {}, tempProjData = {};

               var j;
               for (j = 0; j < batterCurrent.length; j++) {
                 if (line === batterCurrent[j].name) {
                   tempCurrData = batterCurrent[j];
                   break;
                 }
               }

               for (j = 0; j < batterProj.length; j++) {
                 if (line == batterProj[j].name) {
                   tempProjData = batterProj[j];
                   break;
                 }
               }

               return (
                 <LineupModal key={i} starter={false} home={true} player={line} nav={navi} currentData={tempCurrData} projData={tempProjData}/>
               );
             });

             return lines;
           }
         }
       }

       formatLine(line) {
         var tempStr = String(line);
         if (tempStr.charAt(0) == "-"){
           return tempStr;
         }
         else {
           return "+" + tempStr;
         }
       }

       pendingWagerStr(odds, team) {
         if (odds == null) {
           return "No Pending Wager on Current Game"
         }
         else {
           return "Bet Placed on " + String(team) + " at " + String(this.formatLine(odds))
         }

       }

       bullpenPitcherStr(pitcherArr, navi, pitcherCurrent, pitcherProj) {
         var retStr = "";
         var len = pitcherArr.length;
         var i = 0;
         var resArr = []
         for (i; i < len; i++) {
           resArr[i] = pitcherArr[i].player;
         }

         var lines = resArr.map(function(line, i) {
           var tempCurrData = {}, tempProjData = {};

           var j;
           for (j = 0; j < pitcherCurrent.length; j++) {
             if (line === pitcherCurrent[j].name) {
               tempCurrData = pitcherCurrent[j];
               break;
             }
           }

           for (j = 0; j < pitcherProj.length; j++) {
             if (line == pitcherProj[j].name) {
               tempProjData = pitcherProj[j];
               break;
             }
           }


           return (
             <LineupModal key={i} pitcher={true} home={false} player={line} nav={navi} currentData={tempCurrData} projData={tempProjData}/>

           )
         })

         return lines;
       }


       bullpenCountStr(pitcherArr, cnt) {
         var countNumber = "count" + String(cnt);
         var len = pitcherArr.length;
         var retStr = "";
         var i = 0;
         var resArr = []
         for(i;i < len; i++) {
           resArr[i] = pitcherArr[i][countNumber];
         }

         var lines = resArr.map(function(line, i) {

           return (
             <View key={i}>
              <Text style={styles.nineGuys}>{line}</Text>
             </View>
           )
         })

         return lines;


       }

       restructureCatcherAndDefenseData(inptArr, away_team_name) {
         var awayRank, awayPade, homeRank, homePade;
         var retArr = [];
         var awayArr = [];
         var homeArr = [];

         if (inptArr[0][0].derived_team_name == away_team_name) {
           awayRank = inptArr[0][0].rank;
           awayPade = inptArr[0][0].pade;


           homeRank = inptArr[0][1].rank;
           homePade = inptArr[0][1].pade;
         }
         else {
           homeRank = inptArr[0][0].rank;
           homePade = inptArr[0][0].pade;

           awayRank = inptArr[0][1].rank;
           awayPade = inptArr[0][1].pade;
         }

         awayArr.push(awayRank);
         awayArr.push(awayPade);

         homeArr.push(homeRank);
         homeArr.push(homePade);

         var awayCatcherArr = [];
         var homeCatcherArr = [];

         var cnt;

         for(cnt = 0; cnt < inptArr[1].length; cnt++) {
           var team = inptArr[1][cnt].team;
           if (away_team_name.indexOf(team) != -1) {
             awayCatcherArr.push(inptArr[1][cnt]);
           }
           else {
             homeCatcherArr.push(inptArr[1][cnt]);
           }
         }

         awayArr.push(awayCatcherArr);
         homeArr.push(homeCatcherArr);

         retArr.push(awayArr);
         retArr.push(homeArr);

         return retArr;

       }


       createCatcherRows(inptArr) {
         var lines = inptArr.map(function(line, i) {
           var name = line.name;
           var sample = line.sample;
           var per_game = line.per_game;

           return (
             <View key={i} style={styles.individualCatchingBox}>
              <View style={{flex:3, alignItems:'flex-start'}}>
                <Text>{name}</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-start'}}>
                <Text>{sample}</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-start'}}>
                <Text>{per_game}</Text>
              </View>
             </View>
           )}
         )

        return lines;





       }


}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: 'white',
    alignSelf:'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  thumb: {
    width: 120,
    height:80,
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: 'dimgray',
  },
  sectionText: {
    fontSize: 24,
    textAlign: 'center',
    margin: 4,
    color: 'white',
  },
  lineupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
  },
  singleLineupContainer: {
    flex: 2,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'white',
    padding: 2
  },
  separator: {
     height: 2,
     backgroundColor: 'white'
   },
   nineGuysContainer: {
     borderStyle:'solid',
     borderColor:'gray',
     borderTopWidth:2,
     padding:3
   },
   nineGuys:{
     padding:2,
     fontSize:14,
     lineHeight:20,
   },
   starterText: {
     fontSize:18,
   },
   moneylineContainer:{
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'space-around',
     padding: 5,
   },
   individualMoneylineContainer: {
     flex: 2,
     flexDirection:'column',
     justifyContent: 'flex-start',
     alignItems: 'center',
     backgroundColor:'white',
     padding: 2
   },
   teamDefenseBoxTop:{
     flex:1,
     flexDirection:'column',
     borderBottomWidth:3,
     borderColor:'black'
   },
   teamDefenseBoxBottom:{
     flex:1,
     flexDirection:'column',
   },

   teamCatchingBox:{
     flex:1,
     flexDirection:'column'
   },
   individualCatchingBox: {
     flex:1,
     flexDirection:'row',
     padding:5
   },
   individualDefenseBox:{
     flex:1,
     flexDirection:'row',
     borderBottomWidth:1,
     borderColor:'gray',
     padding:2

   },
   littleDefenseBox:{
     flex:1,
     flexDirection:'column',
     alignItems:'flex-start'
   }
});
