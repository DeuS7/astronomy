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

var sun_texture = new THREE.TextureLoader().load('images/sun.jpg');
sun_texture.anisotropy = 8;
var sun_mat = new THREE.MeshBasicMaterial({
	map: sun_texture,
	overdraw: true
});


sun = new THREE.Mesh(sun_geom, sun_mat);
scene.add(sun);

//Earth

var earth, earth_geom, earth_mat;
earth_geom = new THREE.SphereGeometry(150,20,20);

var earth_texture = new THREE.TextureLoader().load('images/earth.jpg');
earth_texture.anisotropy = 8;
var earth_mat = new THREE.MeshBasicMaterial({
	map: earth_texture,
	overdraw: true
});

earth = new THREE.Mesh(earth_geom, earth_mat);
scene.add(earth);

//Mercury

var mercury, mercury_geom, mercury_mat;
mercury_geom = new THREE.SphereGeometry(90,20,20);

var mercury_texture = new THREE.TextureLoader().load('images/mercury.jpg');
mercury_texture.anisotropy = 8;
var mercury_mat = new THREE.MeshBasicMaterial({
	map: mercury_texture,
	overdraw: true
});

mercury = new THREE.Mesh(mercury_geom, mercury_mat);
scene.add(mercury);

//venus

var venus, venus_geom, venus_mat;
venus_geom = new THREE.SphereGeometry(120,20,20);

var venus_texture = new THREE.TextureLoader().load('images/venus.jpg');
venus_texture.anisotropy = 8;
var venus_mat = new THREE.MeshBasicMaterial({
	map: venus_texture,
	overdraw: true
});

venus = new THREE.Mesh(venus_geom, venus_mat);
scene.add(venus);

//mars

var mars, mars_geom, mars_mat;
mars_geom = new THREE.SphereGeometry(75,20,20);

var mars_texture = new THREE.TextureLoader().load('images/mars.jpg');
mars_texture.anisotropy = 8;
var mars_mat = new THREE.MeshBasicMaterial({
	map: mars_texture,
	overdraw: true
});

mars = new THREE.Mesh(mars_geom, mars_mat);
scene.add(mars);

//jupiter

var jupiter, jupiter_geom, jupiter_mat;
jupiter_geom = new THREE.SphereGeometry(350,20,20);

var jupiter_texture = new THREE.TextureLoader().load('images/jupiter.jpg');
jupiter_texture.anisotropy = 8;
var jupiter_mat = new THREE.MeshBasicMaterial({
	map: jupiter_texture,
	overdraw: true
});

jupiter = new THREE.Mesh(jupiter_geom, jupiter_mat);
scene.add(jupiter);

//saturn

var saturn, saturn_geom, saturn_mat;
saturn_geom = new THREE.SphereGeometry(200,20,20);

var saturn_texture = new THREE.TextureLoader().load('images/saturn.jpg');
saturn_texture.anisotropy = 8;
var saturn_mat = new THREE.MeshBasicMaterial({
	map: saturn_texture,
	overdraw: true
});

saturn = new THREE.Mesh(saturn_geom, saturn_mat);
scene.add(saturn);

//uranus

var uranus, uranus_geom, uranus_mat;
uranus_geom = new THREE.SphereGeometry(200,20,20);

var uranus_texture = new THREE.TextureLoader().load('images/uranus.jpg');
uranus_texture.anisotropy = 8;
var uranus_mat = new THREE.MeshBasicMaterial({
	map: uranus_texture,
	overdraw: true
});

uranus = new THREE.Mesh(uranus_geom, uranus_mat);
scene.add(uranus);

//neptune

var neptune, neptune_geom, neptune_mat;
neptune_geom = new THREE.SphereGeometry(175,20,20);

var neptune_texture = new THREE.TextureLoader().load('images/neptune.jpg');
neptune_texture.anisotropy = 8;
var neptune_mat = new THREE.MeshBasicMaterial({
	map: neptune_texture,
	overdraw: true
});

neptune = new THREE.Mesh(neptune_geom, neptune_mat);
scene.add(neptune);

//pluto

var pluto, pluto_geom, pluto_mat;
pluto_geom = new THREE.SphereGeometry(50,20,20);

var pluto_texture = new THREE.TextureLoader().load('images/pluto.jpg');
pluto_texture.anisotropy = 8;
var pluto_mat = new THREE.MeshBasicMaterial({
	map: pluto_texture,
	overdraw: true
});

pluto = new THREE.Mesh(pluto_geom, pluto_mat);
scene.add(pluto);



//render
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

	earth.position.x = Math.sin(t*0.1)*7500;
	earth.position.z = Math.cos(t*0.1)*7500;

	mercury.position.x = Math.sin(t*0.05)*3000;
	mercury.position.z = Math.cos(t*0.05)*3000;

	venus.position.x = Math.sin(t*0.2)*4500;
	venus.position.z = Math.cos(t*0.2)*4500;

	mars.position.x = Math.sin(t*0.1)*9000;
	mars.position.z = Math.cos(t*0.1)*9000;

	jupiter.position.x = Math.sin(t*0.15)*11000;
	jupiter.position.z = Math.cos(t*0.15)*11000;

	saturn.position.x = Math.sin(t*0.03)*13500;
	saturn.position.z = Math.cos(t*0.03)*13500;

	uranus.position.x = Math.sin(t*0.06)*15000;
	uranus.position.z = Math.cos(t*0.06)*15000;

	neptune.position.x = Math.sin(t*0.08)*17000;
	neptune.position.z = Math.cos(t*0.08)*17000;

	pluto.position.x = Math.sin(t*0.01)*20000;
	pluto.position.z = Math.cos(t*0.01)*20000;


	camera.position.y = y * 30;
	camera.lookAt(scene.position);

	t += Math.PI/180*7;

	render.render(scene, camera);
}