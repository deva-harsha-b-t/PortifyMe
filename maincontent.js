import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const mainColors=[0xa52523,0x345356,0x123456]

const getPlaneTexture = (mapWidth , mapHeight)=>{
    const canvas = document.createElement('canvas')
    canvas.width = mapWidth
    canvas.height = mapHeight;
    const context  = canvas.getContext("2d")

    context.fillStyle = '#546E90'
    context.fillRect(0,0,mapWidth,mapHeight)

    context.lineWidth = 2;
    context.fillStyle = '#E0FFFF'
    context.setLineDash([10,14])

    context.beginPath()
    context.arc(
        mapWidth/2 - arcCenterX,
        mapHeight/2,
        trackRadius,
        0,
        Math.PI * 2
    )
    context.stroke()

    context.arc(
        mapWidth/2 + arcCenterX,
        mapHeight/2,
        trackRadius,
        0,
        Math.PI * 2
    )
    context.stroke()


    return new THREE.CanvasTexture(canvas)

}
const getLeftIsland =()=>{
    const l_Is = new THREE.Shape();
    l_Is.absarc(
        -arcCenterX,
        0,
        innerTrackRadius,
        arcAngle1,
        -arcAngle1,
        false
    )
    l_Is.absarc(
        arcCenterX,
        0,
        outterTrackRadius,
        Math.PI + arcAngle2,
        Math.PI - arcAngle2,
        true
    )
    return l_Is;
}
const getMidIsland =()=>{
    const M_Is = new THREE.Shape();
    M_Is.absarc(
        -arcCenterX,
        0,
        innerTrackRadius,
        arcAngle3,
        -arcAngle3,
        false
    )
    M_Is.absarc(
        arcCenterX,
        0,
        outterTrackRadius,
        Math.PI + arcAngle3,
        Math.PI - arcAngle3,
        true
    )
    return M_Is;
}
const getRightIsland =()=>{
    const R_Is = new THREE.Shape();
    R_Is.absarc(
        -arcCenterX,
        0,
        innerTrackRadius,
        Math.PI - arcAngle1,
        Math.PI + arcAngle1,
        false
    )
    R_Is.absarc(
        arcCenterX,
        0,
        outterTrackRadius,
        -arcAngle2,
        arcAngle2,
        true
    )
    return R_Is;
}
const getRoadOutline = (mapWidth , mapHeight)=>{
    const road = new THREE.Shape()
    road.moveTo(-mapWidth/2 , -mapHeight/2)
    road.lineTo(0,-mapHeight/2)

    road.absarc(
        -arcCenterX,
        0,
        outterTrackRadius,
        -arcAngle4,
        arcAngle4,
        true
    )

    road.absarc(
        arcCenterX,
        0,
        outterTrackRadius,
        Math.PI - arcAngle4,
        Math.PI + arcAngle4,
        true
    )
    road.lineTo(0 , -mapHeight/2)
    road.lineTo(mapWidth/2 , -mapHeight/2)
    road.lineTo(mapWidth/2 , mapHeight/2)
    road.lineTo(-mapWidth/2 , mapHeight/2)
    return road

}

const renderMap=(mapWidth , mapHeight)=>{

    const planeTexture = getPlaneTexture(mapWidth , mapHeight)
    const planeMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(mapWidth, mapHeight),
        new THREE.MeshLambertMaterial({ map:planeTexture})
    )
    scene.add(planeMesh)
    const leftIsland = getLeftIsland();
    const midIsland = getMidIsland();
    const rightIsland = getRightIsland()
    const road = getRoadOutline(mapWidth , mapHeight)
    const fieldMesh = new THREE.Mesh(
        new THREE.ExtrudeBufferGeometry(
            [leftIsland,midIsland,rightIsland,road],
            {depth:6 , bevelEnabled:false}
        ),
        [
            new THREE.MeshLambertMaterial({color:0x67c240}),
            new THREE.MeshLambertMaterial({color:0x23311c}),

        ]
    )
    scene.add(fieldMesh) 

}
const pickRandom=(array)=>{
    return array[Math.floor(Math.random()*array.length)]
}

const getCarTexture = ()=>{
    const canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 32
    const context = canvas.getContext('2d')
    context.fillStyle = "#ffffff"
    context.fillRect(0,0,64,32)

    context.fillStyle = "#666666"
    context.fillRect(0,0,32,24)

    return new THREE.CanvasTexture(canvas)
}

const Car = ()=>{
    const car = new THREE.Group()
    const backWheels = new THREE.Mesh(
        new THREE.CylinderGeometry(8,8,36),
        new THREE.MeshLambertMaterial({color:0x333333})
    )
    backWheels.position.z = 6;
    backWheels.position.x = -18;
    car.add(backWheels)
    const frontWheels = new THREE.Mesh(
    new THREE.CylinderGeometry(8,8,36),
    new THREE.MeshLambertMaterial({color:0x333333})
    )
    frontWheels.position.z = 6;
    frontWheels.position.x = 18;
    car.add(frontWheels)

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60,30,15),
        new THREE.MeshLambertMaterial({color:pickRandom(mainColors)})
    )
    main.position.z = 12
    car.add(main)

    const carTexture = getCarTexture()

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33,24,12),
        [
        new THREE.MeshLambertMaterial({map:carTexture}),
        new THREE.MeshLambertMaterial({map:carTexture}),
        new THREE.MeshLambertMaterial({map:carTexture}),
        new THREE.MeshLambertMaterial({map:carTexture}),
        new THREE.MeshLambertMaterial({color:0xffffff}),
        new THREE.MeshLambertMaterial({color:0xffffff}) ]

    )
    cabin.position.z = 25.5
    cabin.position.x = -6;
    car.add(cabin)

    return car;

}
const scene = new THREE.Scene()
const car  = Car()
scene.add(car)

const ambientLight  = new THREE.AmbientLight(0xffffff,0.6)
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight(0xffffff,0.6)
dirLight.position.set(100,-300,400)
scene.add(dirLight)
const aspectRatio = window.innerWidth / window.innerHeight
const cameraWidth = 950
const cameraHeight = cameraWidth / aspectRatio

const camera = new THREE.OrthographicCamera(
    cameraWidth/-2,
    cameraWidth/2,
    cameraHeight/2,
    cameraHeight/-2,
    1,
    1000
)
const trackRadius = 255
const trackWidth = 45;
const innerTrackRadius = trackRadius - trackWidth
const outterTrackRadius = trackRadius + trackWidth

const arcAngle1 =  (1/3) * Math.PI
const deltaY = Math.sin(arcAngle1) * innerTrackRadius

const arcAngle2 = Math.asin(deltaY * outterTrackRadius)
const arcCenterX = (Math.cos(arcAngle1)*innerTrackRadius + Math.cos(arcAngle2*outterTrackRadius))/2
const arcAngle3 = Math.acos(arcCenterX/innerTrackRadius)
const arcAngle4 = Math.acos(arcCenterX/outterTrackRadius)

camera.position.set(0,0,300)
camera.lookAt(0,0,0)

renderMap(cameraWidth,cameraHeight*2)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(innerWidth,innerHeight)
renderer.render(scene,camera)

//new OrbitControls(camera, renderer.domElement).update()

document.body.appendChild(renderer.domElement)

// const animate=()=>{
//     requestAnimationFrame(animate)
    
// }
// animate()