class Box {
    constructor(x, y, w, h , boxGroup) {
        switch(boxGroup){
            case 1:this.body = Matter.Bodies.rectangle(x, y, w, h,{
                labels: "box1"
            });
            break;
            case 2:this.body = Matter.Bodies.rectangle(x, y, w, h,{
                labels: "box2"
            });
            break;
            case 3:this.body = Matter.Bodies.rectangle(x, y, w, h,{
                labels: "box3"
            });
            break;
        }
        
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