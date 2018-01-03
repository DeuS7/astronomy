var scene, camera, render, container;
var W,H;

W = parseInt(document.body.clientWidth);
H = parseInt(window.innerHeight);

container = document.createElement("div");
document.body.appendChild(container);

camera = new THREE.PerspectiveCamera(45,W/H,1,100000);
camera.position.z = 39000;
scene = new THREE.Scene();

//stars

var starsGeometry = new THREE.Geometry();
var startMaterial = new THREE.ParticleBasicMaterial({color: 0xbbbbbb, opacity: 0.8,  size: 1, sizeAttenuation: false});
var stars;

for (var i = 0;i<1000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.random()*2-1;
	vertex.y = Math.random()*2-1;
	vertex.z = Math.random()*2-1;
	vertex.multiplyScalar(39000);
	starsGeometry.vertices.push(vertex);
}

stars = new THREE.ParticleSystem(starsGeometry, startMaterial);
scene.add(stars);


//Sun

var sun, sun_geom, sun_mat;
sun_geom = new THREE.SphereGeometry(2030,80,80);

var texture = THREE.ImageUtils.loadTexture('images/sun.jpg');
texture.anisotropy = 8;
sun_mat = new THREE.MeshPhongMaterial({map: texture, emissive: 0xffffff});

sun = new THREE.Mesh(sun_geom, sun_mat);
scene.add(sun);

//Earth

var earth, earth_geom, earth_mat;
earth_geom = new THREE.SphereGeometry(50,20,20);
earth_mat = new THREE.MeshNormalMaterial();
earth = new THREE.Mesh(earth_geom, earth_mat);
scene.add(earth);

alert();

render = new THREE.WebGLRenderer();
render.setSize(W,H);
render.setClearColor (0x000000, 1);
container.appendChild(render.domElement);
var t = 0;
var y = 0;

document.addEventListener('mousemove', function(event) {
	y = parseInt(event.offsetY);
});

animate();

function animate() {
	requestAnimationFrame(animate);
	sun.rotation.y += 0.005;

	earth.position.x = Math.sin(t*0.1)*4500;
	earth.position.z = Math.cos(t*0.1)*4500;

	camera.position.y = y * 5;
	camera.lookAt(scene.position);

	t += Math.PI/180*7;

	render.render(scene, camera);
}
