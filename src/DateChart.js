import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, AlertIOS } from 'react-native';
import Graph from 'react-native-line-plot';



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
    paddingTop: 64,
	},
	chart: {
		width: 200,
		height: 100,
	},
});
/*
const data = [
	[0, 44.8],
	[1, 43.9],
	[3, 44.3],
	[4, 43.4],
  [5,45.8],
  [6, 44.4],
];
*/
class DateChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading:true,
    }

    this.fetchData();

  }

  jsonToArray(jsonArr) {
   var retArr = [];
   console.log("inside json converter");
    for(i = 0; i <jsonArr.length; i++) {

       var x = jsonArr[i].tstamp;
       var y = jsonArr[i].h1_line;

       var tempArr = [i, Number(y)];

       retArr.push(tempArr);
      }
    return retArr;
  }


  fetchData() {
      console.log(this.props.gameID);
      fetch('http://localhost:3000/mlb/' + String(this.props.gameID))
      .then((response) => response.json())
      .then((responseData) => {
         console.log("Inside SimpleChart Fectch data");

          var newArr = this.jsonToArray(responseData);
          this.setState({
              dataSource: newArr,
              isLoading: false
          });
      })
      .done();
  }

	render() {
    if (this.state.isLoading) {
      return (
          <View>
              <Text>
                  Loading Games...
              </Text>
          </View>
      );
    }
    else {

		return (
			<View style={styles.container}>
      <Graph
             data={this.state.dataSource}
             graphColorPrimary='#000000'
             graphColorSecondary='#FF0000'
             xUnit='date'
             yUnit='numeric'
             xAxisDensity={2}
             yAxisDensity={20}
         />
			</View>
		);
  }
	}
}


export default DateChart;
