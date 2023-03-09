X_ROTATION_SPEED = 0.01
class Planet {
    // planet is responsible for drawing itself and pulsing frequencies
    constructor(radius, energyType, planet, orbitDistance, orbitSpeed, orbitAngle){
        this.radius = radius;
        this.energyType = energyType;
        this.planet = planet;
        this.orbitSpeed = orbitSpeed;
        this.orbitDistance = orbitDistance;
        this.vector = new p5.Vector(1, 0.5, 0.5);
        this.vector.mult(orbitDistance);
        this.orbitAngle = orbitAngle;
        this.spawnedRings = []
    }

    draw() {
        // get the sound band for visualization
        let frequencyBandAmp = fourier.getEnergy(this.energyType);
        // reduce the amplitude size as the rings get massive otherwise
        let torusRadius = map(frequencyBandAmp, 0, 255, 0, 100) + this.radius;
        push()
        noStroke()

        let vector2 = createVector(0, 0, 1);
        let p = this.vector.cross(vector2);
        // Rotation around a 0-length axis doesn't work in p5.js, so don't do that.
        if (p.x != 0 || p.y != 0 || p.z != 0) {
            rotate(this.orbitAngle, p);
        }
        translate(this.vector.x, this.vector.y, this.vector.z);
        push()
        // apply some rotations because planets spin (usually)
        rotateX(frameCount * X_ROTATION_SPEED);
        // set the image
        texture(this.planet);
        sphere(this.radius);
        pop()

        // create the visualizer ring
        colorMode(HSL, 255);
        emissiveMaterial(frequencyBandAmp, 255, 155);
        // make the rings normal to the radial plane
        let axialVec = p.copy().normalize()
        rotateX(axialVec.x * PI);
        rotateY(axialVec.y * PI);
        rotateZ(axialVec.z * PI);
        torus(torusRadius, 3, 20, 4);
        if (frameCount % 100 === 0) {
            this.spawnRing(torusRadius, frequencyBandAmp, p.copy());
        }
        pop();
        push();
        // code for creating ring trails
        noStroke()
        colorMode(HSL, 255);
        // make the ring makes the rings attached to the planet by matching the rotation
        rotate(this.orbitAngle, p);
        for (let ring of this.spawnedRings) {
            ring.draw();
        }
        // remove off screen rings
        let i = this.spawnedRings.length -1;
        while (i > 0){
            // check the 3d distance from the origin is larger than the viewport
            if (this.spawnedRings[i].pos.dist(this.spawnedRings[i].startPos) >= 800) {
                this.spawnedRings.splice(i,1)
            }
            i--;
        }
        pop();
        this.orbitAngle += this.orbitSpeed;
        
    }

    spawnRing(torusRadius, color, rotationAxis) {
        // send the current state data of the system to the ring
        let currentPos = this.vector.copy();
        this.spawnedRings.push(new planetRing({
            radius: torusRadius, pos: currentPos,
            distanceTicks: 1, color: color,
            rotationAxis: rotationAxis
        }));
    }
}