import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ART,
  Dimensions,
  StyleSheet,
  View, AlertIOS, Text,
} from 'react-native';

const {
  Group,
  Shape,
  Surface,
} = ART;

import * as graphUtils from './graph-utils';



const PaddingSize = 20;
const TickWidth = PaddingSize * 2;

const dimensionWindow = Dimensions.get('window');

export default class GameChart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xAccessor: PropTypes.func.isRequired,
    yAccessor: PropTypes.func.isRequired,
  }

  static defaultProps = {
    width: Math.round(dimensionWindow.width * 0.9),
    height: Math.round(dimensionWindow.height * 0.5),
  };

  state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',

  };

  componentWillMount() {
    this.computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.computeNextState(nextProps);
  }

  computeNextState(nextProps) {
    const {
      data,
      width,
      height,
      xAccessor,
      yAccessor,
    } = nextProps;



    //AlertIOS.alert(String(data.length) )

    const graphWidth = width - PaddingSize * 2;
    const graphHeight = height - PaddingSize * 2;

    const lineGraph = graphUtils.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
    });

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
      ticks: lineGraph.ticks,
      scale: lineGraph.scale,
    });
  }

  render() {

    const {
     yAccessor,
   } = this.props;

    const {
      graphWidth,
      graphHeight,
      linePath,
      ticks,
      scale,
    } = this.state;


    const {
      x: scaleX,
    } = scale;


    //const tickXFormat = scaleX.tickFormat(null, '%b %d');

    console.log("tick length");
    console.log(ticks.length);


    return (

      <View style={styles.container}>
        <Surface width={graphWidth} height={graphHeight}>
          <Group x={0} y={0}>
            <Shape
              d={linePath}
              stroke={'orange'}
              strokeWidth={1}
            />
          </Group>
        </Surface>


      <View key={'ticksX'}>
          {ticks.XTick.map((tickX, index) => {
            //console.log("inside TicksX map");
            const tickStyles = {};
            tickStyles.width = TickWidth;
            //tickStyles.left = tick.x - (TickWidth / 2);
            //console.log("tick.x");
            //console.log(tick.x);
            console.log(tickX);
            return (
              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
                {tickX}
              </Text>
            );
          })}
        </View>

        <View key={'ticksY'} style={styles.ticksYContainer}>
          {ticks.YTick.map((tickY, index) => {
            /*const value = (yAccessor(tick.datum) * 100).toFixed(2)
             console.log("inside TicksY Map");
            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - Math.round(TickWidth * 0.5);

            tickStyles.top = tick.y + 2 - Math.round(TickWidth * 0.65);
            console.log("ticksY value")
            console.log(value)
             */
             console.log(tickY);
             console.log(index)

             const tickStyles = {};
             tickStyles.top = index * PaddingSize;
             tickStyles.width = TickWidth;

            return (
              <View key={index} style={[styles.tickLabelY, tickStyles]}>
                <Text style={styles.tickLabelYText}>
                  {tickY}
                </Text>
              </View>
            );
          })}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },

  tickLabelX: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'black',
    borderRadius: 100,
  },
});
