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
import {
	StackNavigator,
} from 'react-navigation';
import SignatureCapture from 'react-native-signature-capture';
const Sound = require('react-native-sound');

// const c3_sound = require('sounds/C3.mp3');

const Header = ({children}) => (<Text style={styles.header}>{children}</Text>);

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


function createSound(fileName){
  var s = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    } 
    // loaded successfully
    console.log('duration in seconds: ' + s.getDuration() + 'number of channels: ' + s.getNumberOfChannels());
    });
  return s
}

class PlaySound extends Component {

  constructor(props) {
    super(props);
    this.c3 = createSound('sounds/C3.mp3');
    this.d3 = createSound('sounds/D3.mp3');
    this.e3 = createSound('sounds/E3.mp3');
    this.f3 = createSound('sounds/F3.mp3');
    this.g3 = createSound('sounds/G3.mp3');
    this.a4 = createSound('sounds/A4.mp3');
    this.b4 = createSound('sounds/B4.mp3');
    this.c4 = createSound('sounds/C4.mp3');

    this.state = {currentSounds: [] };

    this.playSoundLooped = (sound) => {
      this.state.currentSounds.push(sound);
      sound.setNumberOfLoops(-1);
      sound.play();
    }

    this.stopSoundLooped = (sound) => {
        sound.stop();
        var index = this.state.currentSounds.indexOf(sound);
        this.state.currentSounds.splice(index,1);
    }

    this.doSound = (sound) => {
      this.state.currentSounds.includes(sound) ? 
        this.stopSoundLooped(sound) : this.playSoundLooped(sound);
    }
  }

  render() {
  	const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to PitchPaint!
        </Text>
        <Feature title="Audio" buttonLabel={'C3'} onPress={() =>this.doSound(this.c3)}/>
        <Feature title="Audio" buttonLabel={'D3'} onPress={()=> this.doSound(this.d3)}/>
        <Feature title="Audio" buttonLabel={'E3'} onPress={() =>this.doSound(this.e3)}/>
        <Feature title="Audio" buttonLabel={'F3'} onPress={() =>this.doSound(this.f3)}/>
        <Feature title="Audio" buttonLabel={'G3'} onPress={() =>this.doSound(this.g3)}/>
        <Feature title="Audio" buttonLabel={'A4'} onPress={() =>this.doSound(this.a4)}/>
        <Feature title="Audio" buttonLabel={'B4'} onPress={() =>this.doSound(this.b4)}/>
        <Feature title="Audio" buttonLabel={'C4'} onPress={() =>this.doSound(this.c4)}/>
        <Button title="Go to canvas" 
        onPress={() => navigate('DrawingBoard')}
        />
      </View>
    );
  }
}


class Canvas extends Component {

  render() {
    return (
       <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{alignItems:"center",justifyContent:"center"}}>Signature Capture Extended </Text>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    viewMode={"portrait"}/>

  

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
    padding: 5,
    alignSelf: 'stretch',
  },
  signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
  },
  buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
  }
});

const PitchPaint = StackNavigator({
	Home: { screen: PlaySound },
	DrawingBoard: { screen: Canvas },
});
AppRegistry.registerComponent('PitchPaint', () => PitchPaint);
