function Spectrum(){
	this.name = "spectrum";
	this.draw = function(){
		var spectrum = fourier.analyze();
		canvas2D.noStroke();

		for(var i = 0; i<spectrum.length; i++){

			//fade the colour of the bin from green to red
			var g = map(spectrum[i], 0, 255, 255, 0);
			canvas2D.fill(spectrum[i], g, 0);
			//draw each bin as a rectangle from the left of the screen
			//across
			var y = map(i, 0, spectrum.length, 0, height);
			var w = map(spectrum[i], 0, 255, 0, width);
			canvas2D.rect(0, y, w, height/spectrum.length);
		}  		
		image(canvas2D, -windowWidth/2, -windowHeight/2);
	};
}
