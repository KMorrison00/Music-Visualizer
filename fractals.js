// base code for the fractal imaging was taken from 
// https://editor.p5js.org/MaximSchoemaker/sketches/-bcPIqdon

function Fractals() {
    this.name = 'fractals';
    this.frame = 0;
    this.time = 0;
    const frames = 2000;
    const CPUlimiter = 7;
    this.numberOfSides = 3;
    this.previousDepth = 2;

    this.draw = function () {
        colorMode(HSL, 1);
        this.numberOfSides = 3 + floor(this.time * 4);
        this.maxDepth = CPUlimiter - this.numberOfSides;
        fourier.analyze();
        this.frame += deltaTime / (1000 / 60);
        this.time = fract(this.frame / frames);
        
        scale(width, height);
        stroke(1);
        strokeWeight(0.005);
        // depth determines how many fractals will be currently drawn, subtracting the treble from the max 
        //  stylistically makes the clear notes like snares more obvious by clearing the small levels.
        let depth = this.maxDepth - this.maxDepth * invCosn(map(fourier.getEnergy('treble'), 0, 255, 0, 4));
        if (Math.abs(depth - this.previousDepth) > 0.5) {
            // apply smoothing so the animation is less jarring on large changes 
            depth = (depth + this.previousDepth*10)/11;
        }
        this.rotationAngle = map(fract(this.time/10), 0, 1, 0, 2*PI);
        this.drawFractal(0.5, 0.5, 0.4, depth);
        this.previousDepth = depth;
    }
 
    this.drawFractal = function(x, y, size, depth) {
        const df = constrain(depth, 0, 1);

        for (let i = 0; i < this.numberOfSides; i++) {
            const f = i / this.numberOfSides;
            const angle = this.numberOfSides%2 ===0 ? f - this.rotationAngle: f + this.rotationAngle;
        
            if (depth > 0) {
                const scale = 0.5;
                const r = size * (df * scale);
                const p = polarToXY(angle, r);
                const s = size * (1 - df * scale);
                this.drawFractal(x + p.x, y + p.y, s, depth - 1);
            } else {
                let p1 = polarToXY(angle, size);
                let p2 = polarToXY(angle + 1 / this.numberOfSides, size);
                // tie the hue to the treble so that its reactive, as well as the tiem
                // so the group of colours shifts and is more interesting
                let hue = map(fourier.getEnergy('treble'), 0, 255, 0, 1) + fract(this.time);
                let sat = 1;
                let light = map(fourier.getEnergy('mid'), 0, 255, 0.2, 1);
                stroke(color(hue,sat,light))        
                fill(color(hue,sat,light))
                curve(x, y, x + p1.x, y + p1.y, x + p2.x, y + p2.y, x + p2.x, y + p2.y);
            }
        }
    }
    
}

// math helper functions
polarToXY = function(angle, radius) {
    return {
        x: cos(angle * TWO_PI) * radius,
        y: sin(angle * TWO_PI) * radius,
    }
}
invCosn = function(v) {
    return 1 - (cos(v * TWO_PI) * 0.5 + 0.5);
} 
