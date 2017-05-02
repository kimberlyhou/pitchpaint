Template.canvas_template.rendered = function() {
var canvas = document.getElementById('canvasDiv');
var colors = {
    '#EB023C' : "C3",
    '#0292EB' : "D3",
    '#17BD40' : "E3",
    '#FCA428' : "F3",
    '#2FD4D6' : "G3",
    '#4257C9' : "A4",
    '#579E58' : "B4",
    '#FFDD00' : "C4",

}
Template.instance().colors = colors;

// console.log(colors);
// Drawing Management
var drawColor = Object.keys(colors)[0];
var ctx = canvas.getContext('2d'); 
var painting = document.getElementById('paintDiv');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 10;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = drawColor;
ctx.fillStyle = drawColor;

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

var touchX, touchY;
function drawDot(ctx,x,y,size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        // Select a fill style
        ctx.fillStyle = ctx.fillSyle;
        // Draw a filled circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    } 
function sketchpad_touchStart() {
    // Update the touch co-ordinates
    getTouchPos();
    drawDot(ctx,touchX,touchY,12);
    // Prevents an additional mousedown event being triggered
    event.preventDefault();
}

// Draw something and prevent the default scrolling when touch movement is detected
function sketchpad_touchMove(e) { 
    // Update the touch co-ordinates
    getTouchPos(e);
    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    drawDot(ctx,touchX,touchY,12); 
    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
}


function getTouchPos(e) {
    if (!e)
        var e = event;

    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}

canvas.addEventListener('touchstart', sketchpad_touchStart, false);
canvas.addEventListener('touchmove', sketchpad_touchMove, false);


// Palette Management
var palette = document.getElementById('paletteDiv');

Object.keys(colors).forEach( function(clr) {    
    var clrbtn = document.createElement('div');
    clrbtn.className = "waves-effect waves-light btn";
    clrbtn.style.backgroundColor = clr;
    clrbtn.onclick = function (){ 
        ctx.strokeStyle = clr;
        ctx.fillStyle = clr;
    }
    clrbtn.innerHTML = colors[clr];
    palette.appendChild(clrbtn);

});

Template.instance().canvas = canvas;


var soundMapping = {}; 
var context = null;
var cool = null;


loadAllSounds = function loadAllSounds() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    createMapping(colors);
}


function createMapping(colors){
    Object.keys(colors).forEach( function(clr) { 
    loadSound(clr,colors[clr]);
    });
    Template.instance().soundMapping = soundMapping;
}



function loadSound(clr, soundname) {    
 // Create the Sound 
    var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
    path = "/sounds/"+soundname+".mp3"
    console.log(path);
    getSound.open("GET", path, true); // Path to Audio File
    getSound.responseType = "arraybuffer"; // Read as Binary Data
    getSound.onload = function() {
        context.decodeAudioData(getSound.response, function(buffer){
            var soundBuffer = buffer; // Decode the Audio Data and Store it in a Variable
            soundMapping[clr] = soundBuffer;
            cool = buffer;
        });
    }
    getSound.send(); // Send the Request and Load the File

}

function getSound(clr,map) {
    var playSound = context.createBufferSource(); // Declare a New Sound
    playSound.buffer = map[clr]; // Attatch our Audio Data as it's Buffer
    playSound.connect(context.destination);
    playSound.loop = true;  // Link the Sound to the Output
    return playSound;   
}


var clm = 0;
function setColumn(num) {clm = num;}
function getColumn() {
    var clrClm = [];  
    clm = clm % canvas.width;
    for (var j = 0; j < canvas.height; j++){
        var imgData = ctx.getImageData(clm,j,1,1);
        var data = imgData.data;
        var pxlClr = rgbToHex(data[0], data[1], data[2]);
        if (pxlClr == '#000000' | !(Object.keys(colors)).includes(pxlClr)) continue;
        if (!clrClm.includes(pxlClr)) { clrClm.push(pxlClr); }
    }
  clm++;
  return clrClm;
}


function componentToHex(c) {
    var hex = c.toString(16);
    hex = hex.toUpperCase();
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


Template.instance().togglePlay = function togglePlay(){
        console.log("playing");
        play();
        pause();

}

var currentSounds = {};
function pause() {
    Object.keys(currentSounds).forEach(function (clr) {
        currentSounds[clr].stop();
    });
    currentSounds = {};
    setColumn(0);
}


function play(){
    var speed = 25;
    var i = 0;
    var j= 0;

    while (i<800){ //loop
        console.log(i);

        if (j % speed == 0){
            var clmColors = getColumn();
            var currentColors = Object.keys(currentSounds);
            clmColors.forEach(function (clm_clr){ 
                if (!currentColors.includes(clm_clr)){
                    var soundClr = getSound(clm_clr, soundMapping);
                    currentSounds[clm_clr] = soundClr;
                    currentSounds[clm_clr].start(0);
                }
            });

            currentColors.forEach(function (curr_clr){
                if (!clmColors.includes(curr_clr)){
                    currentSounds[curr_clr].stop();
                    delete currentSounds[curr_clr];
                }
            });
            i++;
        }
        j++;
    } //loop
}

Template.instance().toggleSave = function toggleSave(){
        console.log("saving");
        save();      
}

function save() {

    var image = canvas.toDataURL("image/png");
    console.log(image);
    // save this image (along with other attributes) in a Drawings array/list as custom data under the user ID
}


loadAllSounds();
};


Template.canvas_template.events({
    'click #play': function(e){ 
        Template.instance().togglePlay();
     },

     'click #save': function(e) {
        Template.instance().toggleSave();
     }

});


