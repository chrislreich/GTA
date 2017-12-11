'use strict'

import React, { Component } from 'react'
import { View, PropTypes } from 'react-native'
import { StockLine } from 'react-native-pathjs-charts'
import moment from 'moment'

class PathPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      isLoading: true,
    }
    this.fetchData();
  }

  fetchData() {
    var fetchString = 'http://localhost:3000/mlb/' + String(this.props.gameID);
    fetch(fetchString)
    .then((response) => response.json())
    .then((responseData) => {
        console.log("inside GamePAge FetchData");
        console.log(responseData.length);
        this.setState({
            dataSource: responseData,
            isLoading: false,
        });
        console.log("state set");
    })
    .done();
    console.log("End of Fetch")
  }

  render() {
    if (this.state.isLoading === true) {
      console.log("loading view")
      return (
          <View style={styles.headerButton}>
              <Text>
                  Loading Games...
              </Text>
          </View>
      );
    }
    else {
      let data = [
      [{
        "x": 0,
        "y": 47782
      }, {
        "x": 1,
        "y": 48497
      }, {
        "x": 2,
        "y": 77128
      }, {
        "x": 3,
        "y": 73413
      }]
    ]
    let options = {
      width: 250,
      height: 250,
      color: '#2980B9',
      margin: {
        top: 10,
        left: 35,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        labelFunction: ((v) => {
          let d = moment('2016-10-08 14:00','YYYY-MM-DD HH:mm')
          return d.add((v * 2),'hours').format('MM/DD/YY[\n]h:mm A')
        }),
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (
      <View>
        <StockLine data={data} options={options} xKey='x' yKey='y' />
      </View>
    )
  }
}
}

export default PathPage;
