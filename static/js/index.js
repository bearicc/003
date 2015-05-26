$(document).ready(function() {

});

var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = 600; // window.innerHeight
var container, scene, camera, renderer, controls, stats;
var keyboard = new KeyboardState();
var clock = new THREE.Clock();
var floor, cube, sphere;
// dat-gui
var gui_controls = new function() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
}
var gui = new dat.GUI({autoPlace: false});
document.getElementById('dat-gui').appendChild(gui.domElement);
gui.add(gui_controls, 'rotationSpeed', 0, 0.5);
gui.add(gui_controls, 'bouncingSpeed', 0, 0.5);

init();
animate();

// FUNCTIONS
function init() {
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 1000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);
    // RENDERER
    if (Detector.webgl)
        renderer = new THREE.WebGLRenderer({antialias:true});
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMapEnabled = true;
    container = document.getElementById('WebGL');
    container.appendChild(renderer.domElement);
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({charCode : 'm'.charCodeAt(0)});
    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
    // LIGHT
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);
    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture('/static/img/checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
    var floorGeometry = new THREE.PlaneBufferGeometry(500, 500, 20, 20);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = -0.5*Math.PI;
    floor.position.x = 15;
    floor.position.y = 0;
    floor.position.z = 0;
    scene.add(floor);
    // SKYBOX
    var skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x9999ff, side: THREE.BackSide});
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);
    // AXIS
    var axes = new THREE.AxisHelper(20);
    scene.add(axes);
    // cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 5;
    cube.position.z = 0;
    scene.add(cube);
    // sphere
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    scene.add(sphere);
}

function update() {
    if (keyboard.pressed("z")) {
        // do something
    }

    controls.update();
    stats.update();
}

var step = 0;
function render() {
    step+=gui_controls.bouncingSpeed;
    sphere.position.x = 10*(Math.cos(step));
    sphere.position.y = 2+(10*Math.abs(Math.sin(step)));
    sphere.position.z = 10*(Math.sin(step));

    cube.rotation.x+=gui_controls.rotationSpeed;
    cube.rotation.y+=gui_controls.rotationSpeed;
    cube.rotation.z+=gui_controls.rotationSpeed;
    cube.position.y = 10+8*(Math.cos(1.5*step));
    /*
     * scene.traverse(function(obj) {
     *     if (obj instanceof THREE.Mesh && obj != floor) {
     *         obj.rotation.x+=gui_controls.rotationSpeed;
     *         obj.rotation.y+=gui_controls.rotationSpeed;
     *         obj.rotation.z+=gui_controls.rotationSpeed;
     *         //obj.position.y = 2*(Math.cos(step));
     *    }
     * });
     */
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}
