'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, Text, ListView, TouchableOpacity, Image } from 'react-native'

import TeamReport from './TeamReport';

// Dictionary to look up team logos
var TEAM_LOGOS = { // AL East
                  "Boston Red Sox": require("../../../mlb_logos/red_sox.gif"),
                  "Baltimore Orioles": require("../../../mlb_logos/orioles.gif"),
                  "Tampa Bay Rays": require("../../../mlb_logos/rays.gif"),
                  "Toronto Blue Jays": require("../../../mlb_logos/blue_jays.gif"),
                  "New York Yankees": require("../../../mlb_logos/yankees.gif"),
                  // AL Central
                  "Detroit Tigers": require("../../../mlb_logos/tigers.gif"),
                  "Cleveland Indians": require("../../../mlb_logos/indians.gif"),
                  "Kansas City Royals": require("../../../mlb_logos/royals.gif"),
                  "Minnesota Twins": require("../../../mlb_logos/twins.gif"),
                  "Chicago White Sox": require("../../../mlb_logos/white_sox.gif"),
                  // AL West
                  "Los Angeles Angels": require("../../../mlb_logos/angels.gif"),
                  "Oakland Athletics": require("../../../mlb_logos/as.gif"),
                  "Seattle Mariners": require("../../../mlb_logos/mariners.gif"),
                  "Houston Astros": require("../../../mlb_logos/astros.gif"),
                  "Texas Rangers": require("../../../mlb_logos/rangers.gif"),
                  // NL East
                  "Atlanta Braves": require("../../../mlb_logos/braves.gif"),
                  "Washington Nationals": require("../../../mlb_logos/nationals.gif"),
                  "New York Mets": require("../../../mlb_logos/mets.gif"),
                  "Miami Marlins": require("../../../mlb_logos/marlins.gif"),
                  "Philadelphia Phillies": require("../../../mlb_logos/phillies.gif"),
                  // NL Central
                  "Cincinnati Reds": require("../../../mlb_logos/reds.gif"),
                  "Chicago Cubs": require("../../../mlb_logos/cubs.gif"),
                  "Pittsburgh Pirates": require("../../../mlb_logos/pirates.gif"),
                  "St. Louis Cardinals": require("../../../mlb_logos/cardinals.gif"),
                  "Milwaukee Brewers": require("../../../mlb_logos/brewers.gif"),
                  // NL West
                  "San Francisco Giants": require("../../../mlb_logos/giants.gif"),
                  "Los Angeles Dodgers": require("../../../mlb_logos/dodgers.gif"),
                  "Arizona Diamondbacks": require("../../../mlb_logos/diamondbacks.gif"),
                  "San Diego Padres": require("../../../mlb_logos/padres.gif"),
                  "Colorado Rockies": require("../../../mlb_logos/rockies.gif")
}





class AllTeamsWagers extends Component {
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
      };

      this._onPress = this._onPress.bind(this);
  }


  componentDidMount() {
       this.createList();
   }


   createList() {
     var dataBlob = {},
       sectionIDs = [],
       rowIDs = [],
       i, len;

     sectionIDs.push("American League");
     sectionIDs.push("National League");

     rowIDs[0] = ["AL"];
     rowIDs[1] = ["NL"];

     dataBlob["American League"] = "American League";
     dataBlob["National League"] = "National League";

     dataBlob["American League:AL"] = {};
     dataBlob["National League:NL"] = {};

     this.setState({
       dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
       isLoading: false
     });
   }

   render() {
     return (
         <ListView
           style={styles.listView}
           dataSource={this.state.dataSource}
           renderRow={this.renderRow.bind(this)}
           renderSectionHeader={this.renderSectionHeader.bind(this)}
         />

     );
   }


   renderSectionHeader(sectionData, sectionID) {
     if (sectionID == "American League") {
         return (
             <View style={styles.americanContainer}>
                 <Text style={styles.sectionText}>{sectionData}</Text>
             </View>
         );
       }
       else {
         return (
             <View style={styles.nationalContainer}>
                 <Text style={styles.sectionText}>{sectionData}</Text>
             </View>
         );
       }
     }


     renderRow(rowData, sectionID, rowID) {
       if (rowID == "AL") {
         return (
           <View style={{flex:1, flexDirection:'row', backgroundColor:'white', padding: 5, justifyContent:'space-around'}}>
            <View style={{flex:1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Baltimore Orioles")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Baltimore Orioles"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Boston Red Sox")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Boston Red Sox"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("New York Yankees")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["New York Yankees"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Tampa Bay Rays")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Tampa Bay Rays"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Toronto Blue Jays")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Toronto Blue Jays"]} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Chicago White Sox")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Chicago White Sox"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Cleveland Indians")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Cleveland Indians"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Detroit Tigers")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Detroit Tigers"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Kansas City Royals")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Kansas City Royals"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Minnesota Twins")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Minnesota Twins"]} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1, flexDirection:'column', justifyContent:'space-around' , alignItems:'center'}}>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Houston Astros")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Houston Astros"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Los Angeles Angels")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Los Angeles Angels"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Oakland Athletics")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Oakland Athletics"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Seattle Mariners")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Seattle Mariners"]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.th} onPress={() => this._onPress("Texas Rangers")}>
                <Image style={styles.thumb} source={TEAM_LOGOS["Texas Rangers"]} />
              </TouchableOpacity>
            </View>
          </View>

          );
        }
        else {
          return (
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', backgroundColor:'white', padding:5}}>
             <View style={{flex:1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Atlanta Braves")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Atlanta Braves"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Miami Marlins")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Miami Marlins"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("New York Mets")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["New York Mets"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Philadelphia Phillies")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Philadelphia Phillies"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Washington Nationals")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Washington Nationals"]} />
               </TouchableOpacity>
             </View>
             <View style={{flex:1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Chicago Cubs")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Chicago Cubs"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Cincinnati Reds")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Cincinnati Reds"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Milwaukee Brewers")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Milwaukee Brewers"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Pittsburgh Pirates")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Pittsburgh Pirates"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("St. Louis Cardinals")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["St. Louis Cardinals"]} />
               </TouchableOpacity>
             </View>
             <View style={{flex:1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Arizona Diamondbacks")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Arizona Diamondbacks"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Colorado Rockies")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Colorado Rockies"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("Los Angeles Dodgers")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["Los Angeles Dodgers"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("San Diego Padres")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["San Diego Padres"]} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.th} onPress={() => this._onPress("San Francisco Giants")}>
                 <Image style={styles.thumb} source={TEAM_LOGOS["San Francisco Giants"]} />
               </TouchableOpacity>
             </View>
           </View>
          );
        }
      }

      _onPress(team) {

        this.props.navigator.push({
          title: team,
          component: TeamReport,
          passProps: {
            team_name:team
          }
        });

      }


}

export default AllTeamsWagers;





const styles = StyleSheet.create({
  row: {
   flexDirection: 'row',
   justifyContent: 'center',
   padding: 10,
   backgroundColor: '#F6F6F6',
 },
 thumb: {
   width: 120,
   height:80,
   padding:5
 },
 text: {
   flex: 1,
 },

 listView: {
       backgroundColor: 'white'
   },




  americanContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  nationalContainer: {
    flex:1,
    backgroundColor:'royalblue'
  },
  sectionText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 8,
    color: 'white',
    fontFamily:'cochin'
  },



   th: {
     padding:10,

   }
});
