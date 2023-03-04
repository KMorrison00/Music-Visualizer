//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
// use a graphics object instead of default canvas so the 2d renders still work in WEBGL mode
var canvas2D = null;
// variable for 3d font object
var font = null;

// planet variables for their textures
var sun = null;
var mercury = null;
var venus = null;
var earth = null;
var mars = null;
var jupiter = null;
var saturn = null;
var uranus = null;
var neptune = null;

function preload(){
	// sound = loadSound('assets/stomper_reggae_bit.mp3');
	sound = loadSound('assets/articMonkeys.mp3');
	font = loadFont('assets/OpenSans.ttf');

	// images for the planets taken from
	// https://nasa3d.arc.nasa.gov/ and
	// https://supernova.eso.org/exhibition/images

	// idea for planet audio visualizer given inspiration from this
	// earthquake map visualizer
	// https://editor.p5js.org/codingtrain/sketches/tttPKxZi

	sun = loadImage('assets/sun.jpg');
	mercury = loadImage('assets/mercury.jpg');
	venus = loadImage('assets/venus.jpg');
	earth = loadImage('assets/earth.jpg');
	mars = loadImage('assets/mars.jpg');
	jupiter = loadImage('assets/jupiter.jpg');
	saturn = loadImage('assets/saturn.jpg');
	uranus = loadImage('assets/uranus.jpg');
	neptune = loadImage('assets/neptune.jpg');
}

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(font)
	textSize(windowWidth*0.1);
	background(0);
	canvas2D = createGraphics(windowWidth, windowHeight);
	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	vis.add(new Fractals());
	vis.add(new SpiralAmplitude());
	vis.add(new SolarSystem())

}

function draw(){
	background(0);
	canvas2D.background(0);
	push();
	if (vis.selectedVisual.twoD === true) {
		//draw the selected visualisation, isolated, so they dont interfere
		canvas2D.push();
		vis.selectedVisual.draw();
		canvas2D.pop();
	} else {
		vis.selectedVisual.draw();
	}
	pop();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
