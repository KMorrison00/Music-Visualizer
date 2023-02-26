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

function preload(){
	// sound = loadSound('assets/stomper_reggae_bit.mp3');
	sound = loadSound('assets/articMonkeys.mp3');
	font = loadFont('assets/OpenSans.ttf');
	console.log('loaded fonts! !!!!!!!!!!!!!!!!!!!!!!!!!!!!')
}

function setup(){
	console.log('set fonts! !!!!!!!!!!!!!!!!!!!!!!!!!!!!')
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
	vis.add(new ThreeDVisualizer())

}

function draw(){
	background(0);
	canvas2D.background(0);
	push()
	canvas2D.push()
	//draw the selected visualisation, isolated, so they dont interfere
	vis.selectedVisual.draw();
	canvas2D.pop()
	pop()
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
