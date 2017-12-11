'use strict'


import React, { Component, PropTypes } from 'react'
import {View} from 'react-native'
import Svg ,{ G, Line, Text, Path } from 'react-native-svg'
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'

import GraphAxis from './GraphAxis';

class MovingAverageGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {dimensions: undefined};
   }

   onLayout = event => {

    if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  render () {
    // If dimensions is defined, render the real view otherwise the dummy view


    if (this.state.dimensions) {

      var { dimensions } = this.state;


      var { width, height } = dimensions;


      var padding = 35;
      var { xScale, yScale} = this.createScales(this.props.movingAverageData, width, height, padding);



      var dates = this.props.movingAverageData.map(pair => pair.date.getTime());

      var vals = this.props.movingAverageData.map(pair => pair.value);


      var minDate = new Date(Math.min(...dates));

      var maxDate = new Date(Math.max(...dates));

      var minVal = Math.min(... vals);
      var maxVal = Math.max(... vals);

      if (minVal < 0) {
        minVal = (Math.floor(minVal/(-1000))  + 1) * (-1000);
      }
      else {
        minVal = (Math.floor(minVal/1000)  + 1 ) * (-1000);
      }

      if (maxVal >= 0) {
        maxVal = (Math.floor(maxVal/1000) + 1) * 1000;
      }
      else {
        maxVal = (Math.floor(maxVal/(-1000))+ 1) * 1000;
      }


      var yZeroPoint = yScale(0);
      var xLeft = xScale(minDate);
      var xRight = xScale(maxDate);


      var lineGenerator = d3shape.line()
      .x(function(d) { return xScale(d.date)})
      .y(function(d) { return yScale(d.value)});

      var data = lineGenerator(this.props.movingAverageData);



    }

    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor:'whitesmoke'}} onLayout={this.onLayout}>
        {
          this.state.dimensions
           ? <Svg width={width} height={height}>
              <GraphAxis
                 width={width - 2 * padding}
                 x={padding}
                 y={height - padding}
                 ticks={4}
                 startVal={minDate}
                 endVal={maxDate}
                 scale={xScale}
              />
               <GraphAxis
                  width={height - (2 * padding) + 25}
                  x={padding}
                  y={height - padding}
                  ticks={3}
                  startVal={minVal}
                  endVal={maxVal}
                  scale={yScale}
                  vertical
                />
               <Path
                 fill='none'
                 stroke='darkred'
                 strokeWidth='2'
                 strokeOpacity='.7'
                 d={data}  />
               <Line
                 stroke='black'
                 strokeWidth='2'
                 x1={xLeft}
                 x2={xRight}
                 y1={yZeroPoint}
                 y2={yZeroPoint}
                 strokeDasharray={[5,5]} />

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

    if (minVal < 0) {
      minVal = (Math.floor(minVal/(-1000))  + 1) * (-1000);
    }
    else {
      minVal = (Math.floor(minVal/1000)  + 1 ) * (-1000);
    }

    if (maxVal >= 0) {
      maxVal = (Math.floor(maxVal/1000) + 1) * 1000;
    }
    else {
      maxVal = (Math.floor(maxVal/(-1000))+ 1) * 1000;
    }

    let xScale = d3scale.scaleTime().domain([new Date(Math.min(...dateTimes)),
                    new Date(Math.max(...dateTimes))]);
    // y grows to the bottom in SVG, but our y axis to the top
    let yScale = d3scale.scaleLinear().domain([minVal, maxVal]);



    xScale.range([padding, width - padding]);



    yScale.range([height - padding, padding - 25]);


    return {xScale, yScale};
}

}


export default MovingAverageGraph;
