'use strict'


import React, { Component, PropTypes } from 'react'
import {View} from 'react-native'
import Svg ,{ G, Line, Text, Path } from 'react-native-svg'
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'

import LineAxis from './LineAxis';

class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {dimensions: undefined};
   }

   onLayout = event => {



    //if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout

    this.setState({dimensions: {width, height}})
  }

  render () {
    // If dimensions is defined, render the real view otherwise the dummy view


    if (this.state.dimensions) {

      var { dimensions } = this.state;


      var { width, height } = dimensions;

      if (height == 0) {
        height = 200;
      }


      var padding = 35;
      var { xScale, yScale} = this.createScales(this.props.lineMovement, width, height, padding);



      var dates = this.props.lineMovement.map(pair => pair.date.getTime());

      var vals = this.props.lineMovement.map(pair => pair.value);


      var minDate = new Date(Math.min(...dates));

      var maxDate = new Date(Math.max(...dates));

      var minVal = Math.min(... vals) - 5;
      var maxVal = Math.max(... vals) + 5;




      var lineGenerator = d3shape.line()
      .x(function(d) { return xScale(d.date)})
      .y(function(d) { return yScale(d.value)});

      var data = lineGenerator(this.props.lineMovement);





      var xPoint = undefined;
      if (this.props.wagerPlaced) {
        xPoint = xScale(this.props.wagerPlaced);

      }

      var yPoint = undefined;

      if (this.props.wagerPlaced) {
        if (this.props.homeTeam == this.props.wagerTeam) {
          var otherWager;
          if (this.props.wagerOdds < 0) {
            otherWager = this.props.wagerOdds + 100;
          }
          else {
            otherWager = this.props.wagerOdds - 100;
          }
          yPoint = yScale(otherWager);
        }
        else {
          var otherWager;
          if (this.props.wagerOdds < 0) {
            otherWager = this.props.wagerOdds + 100;
          }
          else {
            otherWager = this.props.wagerOdds - 100;
          }
          otherWager = (otherWager + 10) * (-1);

          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

          console.log(otherWager)
          yPoint = yScale(otherWager)
        }
      }



      var yMin = yScale(minVal);
      var yMax = yScale(maxVal);

      var xMax = xScale(maxDate);
      var xMin = xScale(minDate);





    }

    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor:'white'}} onLayout={this.onLayout}>
        {
          this.state.dimensions
           ? <Svg width={width} height={height}>
              <LineAxis
                 width={width - 2 * padding}
                 x={padding}
                 y={height - padding}
                 ticks={4}
                 startVal={minDate}
                 endVal={maxDate}
                 scale={xScale}
              />
               <LineAxis
                  width={height - (2 * padding)}
                  x={padding}
                  y={height - padding}
                  ticks={4}
                  startVal={minVal}
                  endVal={maxVal}
                  scale={yScale}
                  vertical
                />
               <Path
                 fill='none'
                 stroke='goldenrod'
                 strokeWidth='2'
                 strokeOpacity='.7'
                 d={data}  />
                {this.props.wagerPlaced ?
                  <Line
                    stroke='dodgerblue'
                    strokeWidth='1'
                    x1={xMin}
                    x2={xMax}
                    y1={yPoint}
                    y2={yPoint}
                     /> : undefined}
                 {this.props.wagerPlaced ?
                  <Line
                    stroke='dodgerblue'
                    strokeWidth='1'
                    x1={xPoint}
                    x2={xPoint}
                    y1={yPoint}
                    y2={yMin}
                     /> : undefined}
             </Svg>
           : undefined}
      </View>
    )
  }


  createScales = (dataPoints, width, height, padding) => {



    var xLeft = padding;
    var xRight = width - padding;

    var yLeft = height - padding;
    var yRight = padding;


    let dateTimes = dataPoints.map(pair => pair.date.getTime());
    let values = dataPoints.map(pair => pair.value);

    var minVal = Math.min(... values);
    var maxVal = Math.max(... values);





    let xScale = d3scale.scaleTime().domain([new Date(Math.min(...dateTimes)),
                    new Date(Math.max(...dateTimes))]);
    // y grows to the bottom in SVG, but our y axis to the top
    let yScale = d3scale.scaleLinear().domain([minVal - 5, maxVal + 5]);



    xScale.range([padding, width - padding]);



    yScale.range([height - padding, padding]);


    return {xScale, yScale};
}

}


export default LineGraph;
