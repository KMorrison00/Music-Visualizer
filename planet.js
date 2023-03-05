

class Planet {
    // planet is responsible for drawing itself and pulsing frequencies
    constructor(radius, energyType, planet, orbitDistance, orbitSpeed, angle){
        this.radius = radius;
        this.energyType = energyType;
        this.planet = planet;
        this.orbitSpeed = orbitSpeed;
        this.orbitDistance = orbitDistance;
        this.vector = new p5.Vector(1, 0.5, 0.5);
        this.vector.mult(orbitDistance);
        this.angle = angle;
    }

    draw() {
        let frequencyBandAmp = fourier.getEnergy(this.energyType);
        push()
        noStroke()

        let vector2 = createVector(0, 0, 1);
        let p = this.vector.cross(vector2);
        // Rotation around a 0-length axis doesn't work in p5.js, so don't do that.
        if (p.x != 0 || p.y != 0 || p.z != 0) {
            rotate(this.angle, p);
        }
        // stroke(255);
        translate(this.vector.x, this.vector.y, this.vector.z);
        // apply some rotations because planets spin (usually)
        // rotateZ(frameCount * 0.01);
        // rotateY(frameCount * 0.05);
        rotateX(frameCount * 0.01);
        // set the image
        texture(this.planet);
        sphere(this.radius);
        // pop()
        // push()
        // create the visualizer ring
        colorMode(HSL, 255);
        emissiveMaterial(frequencyBandAmp, 255, 155);
        // rotateX(frameCount * 0.01);
        torus(frequencyBandAmp + this.radius + 10, 3, 20, 4);
        // if (frameCount % 30 === 0) {
        //     this.spawnRing(frequencyBandAmp);
        // }
        pop()
        this.angle += this.orbitSpeed;
    }

    spawnRing() {

    }
}