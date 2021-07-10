class Ground {
    constructor(x, y, w, h, texture) {
        this.body = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true,labels:"ground" });
        this.w = w;
        this.h = h;
        this.texture = texture;
        World.add(world, this.body);
    }

    show() {
        const pos = this.body.position
        const angle = this.body.angle
        push()
        translate(pos.x, pos.y)
        rotate(angle)
        if(this.texture == null){
            fill(255);
            rectMode(CENTER);
            rect(0,0,this.w,this.h);

        }else{
            imageMode(CENTER);
            image(this.texture,0, 0, this.w, this.h);
        }

        pop()
    }
}