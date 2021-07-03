class Bird {
    constructor(x, y, d) {
        this.body = Matter.Bodies.circle(x, y, d / 2);
        this.d = d;
        World.add(world, this.body);

    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(255);
        rectMode(CENTER);
        circle(0, 0, this.d);
        pop();
    }
}