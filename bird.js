class Bird {
    constructor(x, y, d) {
        this.body = Matter.Bodies.circle(x, y, d / 2,{
            labels:"bird"
        });
        this.d = d;
        World.add(world, this.body);
        Matter.Body.setMass(this.body, this.body.mass*1.5)

    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(255);
        rectMode(CENTER);
        circle(0, 0, this.d);
        pop();
    }
}