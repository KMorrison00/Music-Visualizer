

class Planet {
    // planet is responsible for drawing itself and pulsing frequencies
    constructor(radius, energyType, planet){
        this.radius = radius
        this.energyType = energyType
        this.planet = planet
    }

    draw() {
        fourier.analyze()
        let frequencyBandAmp = fourier.getEnergy(this.energyType);
        background(0)
        push()
        noStroke()
        // apply some rotations because planets spin (usually)
        rotateZ(frameCount * 0.01);
        rotateY(frameCount * 0.05);
        rotateX(frameCount * 0.01);
        // set the image
        texture(this.planet);
        sphere(this.radius);
        pop()
        push()
        // create the visualizer ring
        colorMode(HSL, 255);
        noStroke()
        emissiveMaterial(frequencyBandAmp, 255, 155);
        rotateX(frameCount * 0.01);
        torus(frequencyBandAmp + this.radius + 10);
        pop()
    }
}