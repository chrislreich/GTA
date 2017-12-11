'use strict'

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  TouchableHighlight, Image, Button, Modal, ScrollView, TouchableWithoutFeedback
} from 'react-native';


import DisplayBatterStats from './DisplayBatterStats';
import DisplayPitcherStats from './DisplayPitcherStats';
import DisplayBullpenStats from './DisplayBullpenStats';


const Dimensions = require('Dimensions');

export default class LineupModal extends Component {
  constructor(props) {
    super(props);

    this.state = {modalVisible: false,};
    this._setModalVisible = this._setModalVisible.bind(this);
  }

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };


  render() {
    var {height, width} = Dimensions.get('window');
    var modalHeight, modalWidth, verticalMargin_top, verticalMargin_bottom, horizontalMargin_major, horizontalMargin_minor;




    modalHeight = (height / 100) * 82;
    modalWidth = (width / 100) * 52;

    verticalMargin_top = (height / 100) * 14;
    verticalMargin_bottom = (height / 100) * 4;
    if(this.props.home) {
      horizontalMargin_major = (width / 100) * 45
      horizontalMargin_minor = (width / 100) * 3
    }
    else {
      horizontalMargin_minor = (width / 100) * 45
      horizontalMargin_major = (width / 100) * 3
    }
    return (
    <View>
      <Modal
         transparent={true}
         visible={this.state.modalVisible}
         supportedOrientations={['portrait', 'landscape']}>

           <TouchableOpacity
              style={{flex:1}}
              activeOpacity={5}
              onPressOut={() => {this._setModalVisible(false)}}>

              <ScrollView
                directionalLockEnabled={true}
                contentContainerStyle={styles.scrollModal}>
                <TouchableWithoutFeedback >
                  <View
                    style={{height:modalHeight, width:modalWidth, top:verticalMargin_top, bottom:verticalMargin_bottom, left:horizontalMargin_minor, right:horizontalMargin_major,
                    backgroundColor:'ivory', borderWidth:2, borderColor:'black',
                    borderBottomLeftRadius: 4,borderBottomRightRadius: 4,borderTopLeftRadius: 4,borderTopRightRadius:4}}>

                    {this.props.starter ? <DisplayPitcherStats player={this.props.player} nav={this.props.nav} handler={this._setModalVisible} currentData={this.props.currentData} projData={this.props.projData}/> : this.props.pitcher ? <DisplayBullpenStats player={this.props.player} nav={this.props.nav} handler={this._setModalVisible} currentData={this.props.currentData} projData={this.props.projData}/> : <DisplayBatterStats player={this.props.player} nav={this.props.nav} handler={this._setModalVisible} currentData={this.props.currentData} projData={this.props.projData}/> }

                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </TouchableOpacity>
         </Modal>

      <Text style={this.props.starter ? styles.starterText : styles.nineGuys} onPress={this._setModalVisible.bind(this, true)}>{this.props.player}</Text>
    </View>
  );

  }
}




const styles = StyleSheet.create({
  nineGuys:{
    padding:2,
    fontSize:14,
    lineHeight:20,
  },
  starterText: {
    fontSize:18,
  },
});
