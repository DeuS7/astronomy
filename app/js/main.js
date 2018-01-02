var scene, camera, render, container;
var W,H;

W = parseInt(document.body.clientWidth);
H = parseInt(window.innerHeight);

container = document.createElement("div");
document.body.appendChild(container);

camera = new THREE.PerspectiveCamera(45,W/H,1,10000);
camera.position.z = 6300;
scene = new THREE.Scene();

//Sun

var sun, sun_geom, sun_mat;
sun_geom = new THREE.SphereGeometry(430,30,30);
sun_mat = new THREE.MeshNormalMaterial();
sun = new THREE.Mesh(sun_geom, sun_mat);
scene.add(sun);

//Earth

var earth, earth_geom, earth_mat;
earth_geom = new THREE.SphereGeometry(50,20,20);
earth_mat = new THREE.MeshNormalMaterial();
earth = new THREE.Mesh(earth_geom, earth_mat);
earth.position.x = 1500;
scene.add(earth);



render = new THREE.CanvasRenderer();
render.setSize(W,H);
render.setClearColor (0xffffff, 1);
container.appendChild(render.domElement);
var t = 0;
var y = 0;

document.addEventListener('mousemove', function(event) {
	y = parseInt(event.offsetY);
});

animate();

function animate() {
	requestAnimationFrame(animate);
	sun.rotation.y += 0.001;

	earth.position.x = Math.sin(t*0.1)*1500;
	earth.position.z = Math.cos(t*0.1)*1500;

	camera.position.y = y * 5;
	camera.lookAt(scene.position);

	t += Math.PI/180*7;

	render.render(scene, camera);
}
