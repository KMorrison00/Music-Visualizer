// create radial visualizer like those often found in edm videos
// change things like, amplitude, colour, maybe add a bass fuzzing 

function SpiralAmplitude() {
    this.name = 'spiral amplitude';
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
        scale(width, height);
        strokeWeight(0.005);
        noFill();
        const size = 0.5;
        beginShape(this.modes[floor(this.time * timer)]);
        if (this.modes[floor(this.time * timer)] === TRIANGLE_FAN) {
            // spans out from first point so we must set the center point
            curveVertex(0.5, 0.5);
        }
        spectrum.forEach((frequency, index) => {
            // 
            let angle = map(index, 0, 1024, 0, 2*PI) + this.rotationAngle;
            let radius = frequency * size * 0.0035;
            let point = polarToXY(angle, radius);
            let hue = map(frequency, 0, 255, 0, 1);
            let sat = 1;
            let light = map(fourier.getEnergy('mid'), 0, 255, 0.2, 1);
            stroke(color(hue,sat,light))        
            curveVertex(0.5 + point.x, 0.5 + point.y);
        });
        endShape();
    }

}