/**
 * Vince Yuan
 * MIT license
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ReactNativeProgressTracker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          ReactNativeProgressTracker
        </Text>
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
});

AppRegistry.registerComponent('ReactNativeProgressTracker', () => ReactNativeProgressTracker);
