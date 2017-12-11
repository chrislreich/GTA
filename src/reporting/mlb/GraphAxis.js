import React, { Component, PropTypes } from 'react'
import Svg, { G, Line, Text } from 'react-native-svg'
import * as d3scale from 'd3-scale'

export default class Axis extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    ticks: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    startVal: PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object]),
    endVal: PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object]),
    vertical: PropTypes.bool,
    scale: PropTypes.func // if scale is specified use that scale
  }

  render () {
    let { width, ticks, x, y, startVal, endVal, vertical } = this.props
    const TICKSIZE = width / 35
    x = x || 0
    y = y || 0
    let endX = vertical ? x : x + width
    let endY = vertical ? y - width : y
    let scale = this.props.scale
    if (!scale) {
      scale = typeof startVal === 'number' ? d3scale.scaleLinear() : d3scale.scaleTime()
      scale.domain(vertical ? [y, endY] : [x, endX]).range([startVal, endVal])
    }
    let tickPoints = vertical ? this.getTickPoints(vertical, y, endY, ticks) : this.getTickPoints(vertical, x, endX, ticks)
    return (
      <G fill='none'>
        <Line
          stroke='#000'
          strokeWidth='2'
          x1={x}
          x2={endX}
          y1={y}
          y2={endY} />
        {tickPoints.map(
           pos => <Line
                    key={pos}
                    stroke='#000'
                    strokeWidth='2'
                    x1={vertical ? x : pos}
                    y1={vertical ? pos : y}
                    x2={vertical ? x - TICKSIZE : pos}
                    y2={vertical ? pos : y + TICKSIZE} />
         )}
        {tickPoints.map(
           pos => <Text
                    key={pos}
                    fill='#000'
                    stroke='#000'
                    fontSize='10'
                    fontFamily='cochin'
                    textAnchor='middle'
                    fontWeight='200'
                    x={vertical ? x - 2 * TICKSIZE : pos}
                    y={vertical ? pos : y + 2 * TICKSIZE}>
                    {typeof startVal === 'number' ? Math.round(scale.invert(pos), 2) : scale.invert(pos).toLocaleDateString()}
                  </Text>
         )}
      </G>
    )
  }

  getTickPoints (vertical, start, end, numTicks) {
    let res = []
    let ticksEvery = Math.floor(this.props.width / (numTicks - 1))
    if (vertical) {
      // Add tick point at Zero
      res.push(this.props.scale(0));

      // Get tick Point Increments for positive and negative
      var positiveIncrement = this.props.endVal / 4;
      var negativeIncrement = this.props.startVal / 4;

      var i = 0;
      var startPositive = positiveIncrement;
      for(i; i < 4; i++) {
        res.push(this.props.scale(startPositive));
        startPositive += positiveIncrement;
      }

      i = 0;
      var startNegative = negativeIncrement;
      for(i; i < 4; i++){
        res.push(this.props.scale(startNegative));
        startNegative += negativeIncrement;
      }

      //for (let cur = start; cur >= end; cur -= ticksEvery) res.push(cur)
    } else {
      for (let cur = start; cur <= end; cur += ticksEvery) res.push(cur)
    }
    return res
  }
}
