class Ground {
    constructor(x, y, w, h) {
        this.body = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true,labels:"ground" });
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }

    show() {
        const pos = this.body.position
        const angle = this.body.angle
        push()
        translate(pos.x, pos.y)
        rotate(angle)
        fill(255);
        rectMode(CENTER)
        rect(0, 0, this.w, this.h);
        pop()
    }
}