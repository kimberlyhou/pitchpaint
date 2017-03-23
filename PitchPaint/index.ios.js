/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
const Sound = require('react-native-sound');

const c3_sound = require('sounds/C3.wav');


const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

const Feature = ({title, onPress, description, buttonLabel = "PLAY"}) => (
  <View style={styles.feature}>
    <Header>{title}</Header>
    <Button title={buttonLabel} onPress={onPress}/>
  </View>
);




export default class PitchPaint extends Component {

  this.state = {
      loopingSound: undefined,
    };

  this.playSoundLooped = () => {
      if (this.state.loopingSound) {
        return;
      }
      const s = new Sound('sounds/C3.wav',Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.log('error', e);
        }
        s.setNumberOfLoops(-1);
        s.play();
      });
      this.setState({loopingSound: s});
    };

    this.stopSoundLooped = () => {
      if (!this.state.loopingSound) {
        return;
      }

      this.state.loopingSound
        .stop()
        .release();
      this.setState({loopingSound: null});
    };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to PitchPaint!
        </Text>
        <Feature title="Main bundle audio (looped)" buttonLabel={'PLAY'} onPress={this.playSoundLooped}/>
        <Feature title="Main bundle audio (looped)" buttonLabel={'STOP'} onPress={this.stopSoundLooped}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    fontSize: 20,
    backgroundColor: 'silver',
    padding: 5,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  feature: {
    padding: 20,
    alignSelf: 'stretch',
  }
});

AppRegistry.registerComponent('PitchPaint', () => PitchPaint);
