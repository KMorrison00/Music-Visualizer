
class planetRing {
    constructor({radius, pos, distanceTicks, color, rotationAxis}) {
        this.radius = radius;
        this.startPos = pos.copy();
        this.pos = pos;
        this.distanceTicks = distanceTicks;
        this.color = color;
        this.rotationAxis = rotationAxis.normalize();
    }

    draw() {
        push()
        // update their position
        translate(this.pos.x, this.pos.y, this.pos.z)
        emissiveMaterial(this.color, 255, 155);
        // rotate it to be normal to the radial plane
        rotateX(this.rotationAxis.x * PI);
        rotateY(this.rotationAxis.y * PI);
        // rotateZ(this.rotationAxis.z * PI);
        torus(this.radius, 3, 20, 4);
        this.distanceTicks += 0.0001
        // slowly move the rings down the axis of rotation to give the apearance of moving through space
        this.pos.sub(this.rotationAxis.copy().mult(this.distanceTicks));
        pop()
    }
}