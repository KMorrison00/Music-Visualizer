
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
        new Planet(50, 'treble', sun),
        // new Planet(25, 'treble', mercury),
        // new Planet(30, 'treble', venus),
        // new Planet(30, 'treble', earth),
        // new Planet(30, 'treble', mars),
        // new Planet(40, 'treble', jupiter),
        // new Planet(40, 'treble', saturn),
        // new Planet(35, 'treble', uranus)
    ]
    // plan now is to have the solar system orbitting through space 
    // where each planet pulses with rings based on frequency
    this.draw = function() {
        push();
        ambientLight('white')
        for (body of this.bodies) {
            body.draw()
        }
        pop();
    }
}