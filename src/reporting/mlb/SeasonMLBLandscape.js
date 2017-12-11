'use strict'

import React, { Component, PropTypes } from 'react'
import { View, NavigatorIOS, AlertIOS, StyleSheet, TextInput, Button, Text, ListView, TouchableHighlight, TouchableOpacity, Image, ActivityIndicator } from 'react-native'

import MovingAverageGraph from './MovingAverageGraph'

class SeasonMLBLandscape extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movingAverageData: [],
      seasonStats: [],
      isLoading: true
    }
  }

  componentDidMount() {
       this.fetchData();
   }

   fetchData() {
     var fetchString = 'http://linkapp.mywire.org:3000/reporting/mlb';
     fetch(fetchString)
     .then((response) => response.json())
     .then((responseData) => {
       var season = [];
       season.push(responseData[2]);
       season.push(responseData[3]);
       season.push(responseData[4]);
       season.push(responseData[5]);
       season.push(responseData[6]);
       season.push(responseData[7]);
       season.push(responseData[8]);
       season.push(responseData[9]);

       var movAverageTemp = responseData[1];
       var movingAverageCleaned = [];
       var firstDate = {"date": new Date("2017-04-16T04:00:00.000Z"), "value":0};
       movingAverageCleaned.push(firstDate);

       var len = movAverageTemp.length;

       var i = 0;
       for (i; i < len; i++) {
         var tempResult = movAverageTemp[i];
         var tempArr = {"date": new Date(tempResult.d), "value":tempResult.rt};

         movingAverageCleaned.push(tempArr);
       }


       this.setState({
         movingAverageData: movingAverageCleaned,
         seasonStats: season,
         isLoading: false
       });
     })
     .done();
   }


   render() {

     if (this.state.isLoading) {
       return(
         <ActivityIndicator
          animating={true}
          style={[styles.centering, {height: 80}]}
          size="large"
        />

       )
     }
     else {
       var len = this.state.movingAverageData.length;
       var avgLine = this.state.seasonStats[7][0]['avg(num)'];

       if (avgLine < 0) {
         avgLine -= 100;
       }
       else {
         avgLine += 100
       }


       var avgLineCleaned = avgLine.toFixed(2);
     return (
       <View style={{flex:1, flexDirection:'column', backgroundColor:'whitesmoke'}}>
        <View style={{height:70, paddingTop:32, alignItems:'center',borderBottomWidth:2, borderColor:'black', backgroundColor:'ghostwhite'}}>
          <Text style={{fontSize:28, fontFamily:'cochin'}}>Season 2017</Text>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:.65, flexDirection:'column'}}>
            <View style={styles.seasonRow}>
              <View style={styles.seasonBox}>
                <Text style={styles.seasonTextLabel}>Net</Text>
                <Text style={styles.seasonTextContent}>{this.state.movingAverageData[len - 1].value}</Text>
              </View>
              <View style={styles.seasonBox}>
                <Text style={styles.seasonTextLabel}>Win</Text>
                <Text style={styles.seasonTextContent}>{this.state.seasonStats[0][0]['count(win)']}</Text>
              </View>
              <View style={styles.seasonBox}>
                <Text style={styles.seasonTextLabel}>Loss</Text>
                <Text style={styles.seasonTextContent}>{this.state.seasonStats[1][0]['count(win)']}</Text>
              </View>
            </View>
            <View style={styles.seasonRow}>
              <View style={styles.seasonBox}>
                <Text style={styles.seasonTextLabel}>CLV</Text>
                <Text style={styles.seasonTextContent}>{this.state.seasonStats[2][0]['avg(clv)'].toFixed(2)}</Text>
              </View>
              <View style={styles.seasonBox}>
                <Text style={styles.seasonTextLabel}>Home</Text>
                <Text style={styles.seasonTextContent}>{this.state.seasonStats[4][0]['home']}</Text>
              </View>
              <View style={styles.seasonBox}>
                <Text style={styles.seasonTextLabel}>Away</Text>
                <Text style={styles.seasonTextContent}>{this.state.seasonStats[3][0]['away']}</Text>
              </View>
            </View>
            <View style={styles.seasonRow}>
              <View style={styles.seasonBox}>
                <Text style={styles.seasonTextLabel}>Avg</Text>
                <Text style={styles.seasonTextContent}>{avgLineCleaned}</Text>
              </View>
                <View style={styles.seasonBox}>
                  <Text style={styles.seasonTextLabel}>Fav</Text>
                  <Text style={styles.seasonTextContent}>{this.state.seasonStats[5][0]['favs']}</Text>
                </View>
                <View style={styles.seasonBox}>
                  <Text style={styles.seasonTextLabel}>Dogs</Text>
                  <Text style={styles.seasonTextContent}>{this.state.seasonStats[6][0]['dogs']}</Text>
                </View>
              </View>
            </View>


          <MovingAverageGraph
                movingAverageData={this.state.movingAverageData} />

        </View>


       </View>
     )
    }
   }

}

export default SeasonMLBLandscape


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
});
