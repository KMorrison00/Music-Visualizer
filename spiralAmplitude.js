// create radial visualizer like those often found in edm videos
// change things like, amplitude, colour, maybe add a bass fuzzing 

function SpiralAmplitude() {
    this.name = 'spiral amplitude';
    this.twoD = true;
    this.time = 0;
    this.frame = 0;
    const frames = 2000;
    this.modes = [POINTS,TRIANGLE_FAN, TRIANGLES, QUADS, null];
    const timer = this.modes.length
    this.draw = function () {
        this.frame += deltaTime / (1000 / 60);
        this.time = fract(this.frame / frames)
        this.rotationAngle = map(fract(this.time/(2*PI)), 0, 1, 0, 2*PI);
        colorMode(HSL, 1);
        var spectrum =  fourier.analyze();
        canvas2D.scale(width, height);
        canvas2D.strokeWeight(0.005);
        canvas2D.noFill();
        const size = 0.5;
        canvas2D.beginShape(this.modes[floor(this.time * timer)]);
        if (this.modes[floor(this.time * timer)] === TRIANGLE_FAN) {
            // spans out from first point so we must set the center point
            canvas2D.curveVertex(0.5, 0.5);
        }
        spectrum.forEach((frequency, index) => {
            // 
            let angle = map(index, 0, 1024, 0, 2*PI) + this.rotationAngle;
            let radius = frequency * size * 0.0035;
            let point = polarToXY(angle, radius);
            let hue = map(frequency, 0, 255, 0, 1);
            let sat = 1;
            let light = map(fourier.getEnergy('mid'), 0, 255, 0.2, 1);
            canvas2D.stroke(color(hue,sat,light))        
            canvas2D.curveVertex(0.5 + point.x, 0.5 + point.y);
        });
        canvas2D.endShape();
    }

}