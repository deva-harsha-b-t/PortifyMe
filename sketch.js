let ground1;
let ground2;
let ground3;
let box1 = [];
let box2 = [];
let box3 = [];
let bird;
let engine;
let world;
let newBird;
let mMouse;
let mConstraint;
let slingshot
const { Engine, World } = Matter
let projectGround;
let educationGround;
let skillsGround;

function preload(){
    projectGround = loadImage('educationGROUND.png');
    educationGround = loadImage('skills.png');
    skillsGround = loadImage('project.png');

}


function setBoxes(){
    for (let i = 0, j = 0; i < 9; i++) {
        if (i != 0 && i % 3 == 0) {
            j++;
        }
        box1[i] = new Box(width - 100 - j * 43, height - 20 - 150, 40, 40, 1 , 'red');

    }
    for (let i = 0, j = 0; i < 9; i++) {
        if (i != 0 && i % 3 == 0) {
            j++;
        }
        box2[i] = new Box(width - 100 - j * 43, height - 200 - 150, 40, 40, 2 , 'green');

    }
    for (let i = 0, j = 0; i < 9; i++) {
        if (i != 0 && i % 3 == 0) {
            j++;
        }
        box3[i] = new Box(width - 100 - j * 43, height - 400 - 150, 40, 40, 3 , 'blue');

    }

}
function setup() {
    canvas = createCanvas(innerWidth, innerHeight);
    engine = Engine.create()
    world = engine.world;
    ground = new Ground(width / 2, height - 10, width, 20 , null);


    ground1 = new Ground((width - 100 - 50), height - 20 - 50, 200, 20 ,projectGround );
    ground2 = new Ground((width - 100 - 50), height - 200 - 50, 200, 20,educationGround);
    ground3 = new Ground((width - 100 - 50), height - 400 - 50, 200, 20,skillsGround);

    setBoxes();

    bird = new Bird(width / 4, height / 2, 35);
    slingshot = new SlingShot(width / 4, height / 2, bird.body)
    mMouse = Matter.Mouse.create(canvas.elt)
    mMouse.pixelRatio = pixelDensity();
    mConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mMouse,
        constraint: {
            render: { visible: true }
        }
    })

    Matter.Events.on(engine,'collisionStart',function(event){
        let pairs = event.pairs;
        pairs.forEach(function(pair){
            if(pair.bodyB.labels==="bird"){
                switch(pair.bodyA.labels){
                    case "box1":
                        showpopup1();    
                        getNewball(2000);
                        break;
                    case "box2":
                        showpopup2();
                        getNewball(2000);
                        break;
                    case "box3":
                        showpopup3();
                        getNewball(2000);
                        break;
                    case "ground":
                            getNewball(500)
                        break;
                }
            }
        })
    })
    World.add(world, mConstraint)


}
function keyPressed() {
    if (key == ' ') {
        getNewball()

    }
}

function mouseReleased() {
    if(mouseY >= slingshot.sling.pointA.y || mouseX <= slingshot.sling.pointA.x){
        setTimeout(() => {
            slingshot.fly();
        }, 100);
    }


}
function getNewball(delay = 100){
    setTimeout(() => {
        World.remove(world, bird.body);
        bird = new Bird(width / 4, height/2, 35);
        slingshot.attach(bird.body);    
    }, delay);

}
function draw() {
    background(0);
    Engine.update(engine);
    ground1.show();
    ground2.show();
    ground3.show();
    ground.show();
    for (let box of box1) {
        box.show();
    }

    for (let box of box2) {
        box.show();
    }
    for (let box of box3) {
        box.show();
    }
    bird.show();
    slingshot.show();
}