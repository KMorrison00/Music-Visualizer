
function SolarSystem() {
    this.twoD = false;
    // solar system is responsible for organizing planets
    this.name = 'Solar System';
    this.bodies = [
        new Planet(40, 'treble',  sun,     1,   0,                    1),
        new Planet(3,  'bass',    mercury, 50,  randRange(0.001, 0.05), map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(9,  'bass',    venus,   80,  randRange(0.001, 0.05), map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(10, 'lowMid',  earth,   110, randRange(0.001, 0.05), map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(6,  'lowMid',  mars,    140, randRange(0.001, 0.05), map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(25, 'mid',     jupiter, 200, randRange(0.001, 0.05), map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(25, 'mid',     saturn,  300, randRange(0.001, 0.05), map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(22, 'highMid', uranus,  330, randRange(0.001, 0.05), map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(20, 'highMid', neptune, 360, randRange(0.001, 0.05), map(Math.random(), 0, 1, 0, TWO_PI))
    ]
    // plan now is to have the solar system orbitting through space 
    // where each planet pulses with rings based on frequency
    this.draw = function() {
        push();
        // call analyze once hear to save computation for all the freq analysis per draw frame
        fourier.analyze()
        for (body of this.bodies) {
            body.draw()
        }
        pop();
    }
    // helper function from mozilla docs
    function randRange(min, max) {
        return Math.random() * (max - min) + min;
      }
      
}