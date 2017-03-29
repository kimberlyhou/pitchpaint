/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PropTypes, Component, WebView } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import SignatureCapture from 'react-native-signature-capture';
const Sound = require('react-native-sound');


// TEST
class Canvas extends Component {

  propTypes: {
    context: React.PropTypes.object,
    render: React.PropTypes.func.isRequired
  };

  render() {

    var contextString = JSON.stringify(this.props.context);
    var renderString = this.props.render.toString();

    return (
      <View>
        <WebView
          automaticallyAdjustContentInsets={false}
          contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
          html={'<style>*{margin:0;padding:0;}canvas{position:absolute;transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector("canvas");(" + renderString + ").call(" + contextString + ", canvas);</script>'}
          opaque={false}
          underlayColor={'transparent'}
          style={this.props.style}/>
      </View>
    );
  };
};

function renderCanvas(canvas) {
  alert(this.message);
  // Canvas demo is from here: http://codepen.io/antoniskamamis/pen/ECrKd
  var ctx = canvas.getContext('2d'),
    particles = [],
    patriclesNum = 50,
    w = 200,
    h = 200,
    colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];

  canvas.width = 200;
  canvas.height = 200;
  canvas.style.left = (window.innerWidth - 200)/2+'px';

  if(window.innerHeight>200)
  canvas.style.top = (window.innerHeight - 200)/2+'px';

  function Factory(){  
    this.x =  Math.round( Math.random() * w);
    this.y =  Math.round( Math.random() * h);
    this.rad = Math.round( Math.random() * 1) + 1;
    this.rgba = colors[ Math.round( Math.random() * 3) ];
    this.vx = Math.round( Math.random() * 3) - 1.5;
    this.vy = Math.round( Math.random() * 3) - 1.5;
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for(var i = 0;i < patriclesNum; i++){
      var temp = particles[i];
      var factor = 1;

      for(var j = 0; j<patriclesNum; j++){

         var temp2 = particles[j];
         ctx.linewidth = 0.5;

         if(temp.rgba == temp2.rgba && findDistance(temp, temp2)<50){
            ctx.strokeStyle = temp.rgba;
            ctx.beginPath();
            ctx.moveTo(temp.x, temp.y);
            ctx.lineTo(temp2.x, temp2.y);
            ctx.stroke();
            factor++;
         }
      }


      ctx.fillStyle = temp.rgba;
      ctx.strokeStyle = temp.rgba;

      ctx.beginPath();
      ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
      ctx.stroke();
      ctx.closePath();


      temp.x += temp.vx;
      temp.y += temp.vy;

      if(temp.x > w)temp.x = 0;
      if(temp.x < 0)temp.x = w;
      if(temp.y > h)temp.y = 0;
      if(temp.y < 0)temp.y = h;
    }
  }

  function findDistance(p1,p2){  
    return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
  }

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  (function init(){
    for(var i = 0; i < patriclesNum; i++){
      particles.push(new Factory);
    }
  })();

  (function loop(){
    draw();
    requestAnimFrame(loop);
  })();
}

class canvasApp extends Component{
  render() {
    return (
      <View>
        <Canvas
          context={{message: 'Hello!'}}
          render={renderCanvas}
          style={{height: 200, width: 200}}
        />
      </View>
    );
  };
};
//////

const Header = ({children}) => (<Text style={styles.header}>{children}</Text>);

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

const Button1 = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button1}>{title}</Text>
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

class HomeScreen extends Component {

  render() {
    const {navigate} = this.props.navigation;
    return(
        <Image source={require('./images/splash.png')}  style={styles.backgroundImage}>
          <Text style={styles.welcome1}>
            PitchPaint!
          </Text>
          <Button1 title="Log In" 
            onPress={() => navigate('DrawingBoard')}
            />
          <Button1 title="Open Canvas" 
            onPress={() => navigate('DrawingBoard')}
            />
          <Button1 title="Check Out Sounds" 
            onPress={() => navigate('Sounds')}
            />  
        </Image>
    );
  };
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
          Welcome to PitchPaint !
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


class MyCanvas extends Component {

  static propTypes = { onSave: PropTypes.func }

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{alignItems:"center",justifyContent:"center"}}>Signature Capture Extended </Text>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    
                    saveImageFileInExtStorage={true}
                    showNativeButtons={false}
                    viewMode={"portrait"}/>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableHighlight style={styles.buttonStyle}
                        onPress={() => { this.saveSign() } } >
                        <Text>Save</Text>
                    </TouchableHighlight>
                  </View>

  

            </View>
    );
  }
  saveSign() {
        this.refs["sign"].saveImage();
}

_onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        
        console.log(result);
    }

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome_screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  welcome1: {
    fontSize: 50,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    marginBottom: 300,
    color: 'red',
    fontFamily: 'Arial Rounded MT Bold',
    fontWeight: 'bold',
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
  button1: {
    fontSize: 25,
    backgroundColor: 'blue',
    padding: 5,
    color: 'white',
    marginBottom: 15,
    fontFamily: 'Arial Rounded MT Bold',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
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
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }
});

const PitchPaint = StackNavigator({
  Home: { screen: HomeScreen },
  Sounds: { screen: PlaySound },
  DrawingBoard: { screen: canvasApp },
});
AppRegistry.registerComponent('PitchPaint', () => PitchPaint);
