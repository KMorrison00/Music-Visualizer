//draw the waveform to the screen
function WavePattern() {
	//vis name
	this.twoD = true;
	this.name = "wavepattern";
	//draw the wave form to the screen
	this.draw = function() {
		canvas2D.noFill();
		canvas2D.stroke(255, 0, 0);
		canvas2D.strokeWeight(2);

		canvas2D.beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++) {
			//for each element of the waveform map it to screen
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, 0, width);
			var y = map(wave[i], -1, 1, 0, height);

			canvas2D.vertex(x, y);
		}

		canvas2D.endShape();
	};
}