
function SolarSystem() {
    this.twoD = false;
    // solar system is responsible for organizing planets
    this.name = 'Solar System';
    // this.bodies = {
    //     Sun     : new Planet(50, 'treble', sun),
    //     Mercury : new Planet(25, 'treble', mercury),
    //     Venus   : new Planet(30, 'treble', venus),
    //     Earth   : new Planet(30, 'treble', earth),
    //     Mars    : new Planet(30, 'treble', mars),
    //     Jupiter : new Planet(40, 'treble', jupiter),
    //     Saturn  : new Planet(40, 'treble', saturn),
    //     Uranus  : new Planet(35, 'treble', uranus)
    // }
    this.bodies = [
        new Planet(40, 'treble', sun, 1, 0, 1),
        new Planet(3, 'treble', mercury, 50, 0.01, map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(9, 'treble', venus, 80, 0.01, map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(10, 'treble', earth, 110, 0.01, map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(6, 'treble', mars, 140, 0.01, map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(25, 'treble', jupiter, 200, 0.01, map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(25, 'treble', saturn, 300, 0.01, map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(22, 'treble', uranus, 330, 0.01, map(Math.random(), 0, 1, 0, TWO_PI)),
        new Planet(20, 'treble', neptune, 360, 0.01, map(Math.random(), 0, 1, 0, TWO_PI))
    ]
    // plan now is to have the solar system orbitting through space 
    // where each planet pulses with rings based on frequency
    this.draw = function() {
        push();
        fourier.analyze()
        for (body of this.bodies) {
            body.draw()
        }
        pop();
    }
}