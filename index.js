/**
 * Vince Yuan
 * MIT license
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  ScrollView,
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
const MIN_CELL_WIDTH = 150;
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
  // For the first left arrow view and the last right arrow view, it returns a rect arrow view.
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
  _arrowView(index: number, totalCount: number, isLeft: boolean, isSelected: boolean) {
    let color = isSelected?selectedColor:notSelectedColor;
    if (isLeft) {
      if (index == 0) {
        // For the first cell, add a rect arrow view
        return <View style={[styles.leftArrowView, {backgroundColor: color}]} />
      } else {
        // For other cell, add an arrow view containing C, D.
        return (
          <View style={[styles.leftArrowView]}>
            <View style={[styles.triangleC, {borderTopColor: color}]}></View>
            <View style={[styles.triangleD, {borderBottomColor: color}]}></View>
          </View>
        );
      }

    } else { // Right arrow view
      if (index == totalCount - 1) {
        // For the last cell, add a rect arrow view
        return <View style={[styles.rightArrowView, {backgroundColor: color}]} />
      } else {
        // An arrow view containing A and polyline.
        return (
          <View style={[styles.rightArrowView]}>
            <View style={[styles.triangleA, {borderLeftColor: isSelected?selectedColor:notSelectedColor}]}></View>
            <Svg width={ARROW_WIDTH} height={HEIGHT}>
              <Polyline fill='none' stroke='gray' strokeWidth='2'
                points={'0,-2 ' + (ARROW_WIDTH-1) +','+ HEIGHT/2
                + ' 0,' + (HEIGHT+2)} />
            </Svg>
          </View>
        );
      }
    }
  }

  _arrowButtons(items: Array<string>, cellWidth: number) {
    let totalCount = items.length;

    return items.map((item, index) => {
      let left = 0;
      let isSelected = index == this.state.selectedIndex;

      if (totalCount == 1 || index == 0) {
        left = 0;
      } else {
        left = (cellWidth - ARROW_WIDTH) * index;
      }
      let positionStyle = {
        position: 'absolute',
        top: 0, left,
        height: HEIGHT,
        width: cellWidth,
      };

      return (
        <TouchableOpacity key={index}
          style={positionStyle}
          onPress={() => { this.setState({selectedIndex: index})}}
          >
          { // Left arrow view
            this._arrowView(index, totalCount, true, isSelected)
          }
          <View style={[styles.titleWrapper, styles.center, styles.bgColor, {backgroundColor: isSelected?selectedColor:notSelectedColor}]}>
            <Text style={styles.titleActionText}>{item}</Text>
          </View>
          { // Right arrow view
            this._arrowView(index, totalCount, false, isSelected)
          }
        </TouchableOpacity>
      );

    });

  }

  render() {
    let items = ['Button 0', 'Button 1', 'Button 2', 'Button 3'];
    let totalCount = items.length;
    let cellWidth = WIDTH;
    let contentWidth = WIDTH;
    if (totalCount > 1) {
      cellWidth = (WIDTH - ARROW_WIDTH) / totalCount + ARROW_WIDTH;
      if (cellWidth < MIN_CELL_WIDTH) {
        cellWidth = MIN_CELL_WIDTH;
      }
      contentWidth = (cellWidth - ARROW_WIDTH) * totalCount + ARROW_WIDTH;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          ReactNativeProgressTracker
        </Text>
        <ScrollView style={styles.progressTracker}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          >
          <View style={[styles.scrollViewContent, {width: contentWidth}]}>
            { this._arrowButtons(items, cellWidth) }
          </View>
        </ScrollView>
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
  },
  scrollViewContent: {
    height: HEIGHT,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgColor: {
    backgroundColor: '#252831',
  },
  titleWrapper: {
    position: 'absolute',
    top: 0,
    left: ARROW_WIDTH,
    right: ARROW_WIDTH,
    height: HEIGHT,
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
    left:0,
  },
  rightArrowView: {
    position: 'absolute',
    top: 0,
    height: HEIGHT,
    width: ARROW_WIDTH,
    right:0
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
