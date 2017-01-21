/**
 * Vince Yuan
 * MIT license
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Svg,{
    Polyline,
} from 'react-native-svg';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 56;
const ARROW_WIDTH = 16;
const selectedColor = '#363a45';
const notSelectedColor = '#252831';

type State = {
  selectedIndex: number,
}

export default class ReactNativeProgressTracker extends Component <void, void, State> {

  state: State = {
    selectedIndex: 0,
  }

  // _arrowView() returns a view containing a triangle A, or a view containing two small triangles, C and D.
  //
  // --------
  // |\\  C |
  // | \\   |
  // |  \\  |
  // |   \\ |
  // |A   \\|
  // |   // |
  // |  //  |
  // | //   |
  // |//  D |
  // --------
  _arrowView(index: number, isSelected: boolean) {
    return ( index == 0 ?
      <View style={[styles.leftArrowView]}>
        <View style={[styles.triangleA, {borderLeftColor: isSelected?selectedColor:notSelectedColor}]}></View>
        <Svg width={ARROW_WIDTH} height={HEIGHT}>
          <Polyline fill='none' stroke='gray' strokeWidth='2'
            points={'0,-2 ' + (ARROW_WIDTH-1) +','+ HEIGHT/2
            + ' 0,' + (HEIGHT+2)} />
        </Svg>
      </View>
      :
      <View style={[styles.rightArrowView]}>
        <View style={[styles.triangleC, {borderTopColor: isSelected?selectedColor:notSelectedColor}]}></View>
        <View style={[styles.triangleD, {borderBottomColor: isSelected?selectedColor:notSelectedColor}]}></View>
      </View>
    );
  }

  _progressTracker() {
    let items = ['Button 0', 'Button 1'];
    let shouldShowArrow = items.length == 2;

    return items.map((item, index) => {
      let left = 0, right = 0;
      let marginLeft = 0, marginRight = 0;
      let isSelected = index == this.state.selectedIndex;

      if (shouldShowArrow) {
        if (index == 1) { // The right one
          left = (WIDTH - ARROW_WIDTH) / 2; right = 0;
          marginLeft = ARROW_WIDTH; marginRight = 0;
        } else {
          left = 0; right = (WIDTH - ARROW_WIDTH) / 2;
          marginLeft = 0; marginRight = ARROW_WIDTH;
        }
      }

      let positionStyle = {
        position: 'absolute',
        top: 0, left, right,
        height: HEIGHT,
      };

      return (
        <TouchableOpacity key={index}
          style={positionStyle}
          onPress={() => { this.setState({selectedIndex: index})}}
          >
          <View style={[styles.flex, styles.center, styles.bgColor, {backgroundColor: isSelected?selectedColor:notSelectedColor}, {marginLeft, marginRight}]}>
            <Text style={styles.titleActionText}>{item}</Text>
          </View>
          {shouldShowArrow?this._arrowView(index, isSelected):null}
        </TouchableOpacity>
      );

    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          ReactNativeProgressTracker
        </Text>
        <View style={styles.progressTracker}>
          { this._progressTracker() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  progressTracker: {
    height: HEIGHT,
    width: WIDTH,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgColor: {
    backgroundColor: '#252831',
  },
  titleActionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },

  //Arrow
  leftArrowView: {
    position: 'absolute',
    top: 0,
    height: HEIGHT,
    width: ARROW_WIDTH,
    right:0,
  },
  rightArrowView: {
    position: 'absolute',
    top: 0,
    height: HEIGHT,
    width: ARROW_WIDTH,
    left:0
  },
  triangleA: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: HEIGHT / 2,
    borderBottomWidth: HEIGHT / 2,
    borderLeftWidth: ARROW_WIDTH - 2,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  triangleC: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_WIDTH - 2,
    borderRightWidth: 0,
    borderTopWidth: HEIGHT / 2 + 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  triangleD: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_WIDTH - 2,
    borderRightWidth: 0,
    borderBottomWidth: HEIGHT / 2 ,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

});

AppRegistry.registerComponent('ReactNativeProgressTracker', () => ReactNativeProgressTracker);
