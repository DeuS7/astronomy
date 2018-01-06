'use strict';

var scene, camera, render, container, light, ambient;
var W, H;
var isInfoShown = false;

var planetSettings = {
	mercury: {
		orbit: 3000,
		rotation: 0.1,
		speedFactor: 0.05
	},
	venus: {
		orbit: 4500,
		rotation: 0.1,
		speedFactor: 0.2
	},
	earth: {
		orbit: 7500,
		rotation: 0.1,
		speedFactor: 0.1
	},
	mars: {
		orbit: 9000,
		rotation: 0.1,
		speedFactor: 0.07
	},
	jupiter: {
		orbit: 11000,
		rotation: 0.1,
		speedFactor: 0.04
	},
	saturn: {
		orbit: 13500,
		rotation: 0.1,
		speedFactor: 0.03
	},
	uranus: {
		orbit: 15000,
		rotation: 0.1,
		speedFactor: 0.06
	},
	neptune: {
		orbit: 17000,
		rotation: 0.1,
		speedFactor: 0.08
	},
	pluto: {
		orbit: 20000,
		rotation: 0.1,
		speedFactor: 0.01
	}
};

W = parseInt(document.body.clientWidth);
H = parseInt(window.innerHeight);

container = document.createElement("div");
document.body.appendChild(container);

camera = new THREE.PerspectiveCamera(45, W / H, 1, 100000);
camera.position.z = 20000;
scene = new THREE.Scene();
scene.add(camera);

light = new THREE.PointLight(0xffffff, 3, 25000);
light.position.set(0, 0, 0);
light.castShadow = true;
light.shadowMapWidth = 2048;
light.shadowMapHeight = 2048;
scene.add(light);

//stars

var starsGeometry = new THREE.Geometry();
var startMaterial = new THREE.ParticleBasicMaterial({ color: 0xbbbbbb, opacity: 0.8, size: 1, sizeAttenuation: false });
var stars;

for (var i = 0; i < 2000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.random() * 2 - 1;
	vertex.y = Math.random() * 2 - 1;
	vertex.z = Math.random() * 2 - 1;
	vertex.multiplyScalar(39000);
	starsGeometry.vertices.push(vertex);
}

stars = new THREE.ParticleSystem(starsGeometry, startMaterial);
scene.add(stars);

//Sun

var sun, sun_geom, sun_mat;
sun_geom = new THREE.SphereGeometry(2030, 80, 80);

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
earth_geom = new THREE.SphereGeometry(150, 20, 20);

var earth_texture = new THREE.TextureLoader().load('images/earth.jpg');
earth_texture.anisotropy = 8;
var earth_mat = new THREE.MeshLambertMaterial({
	map: earth_texture,
	overdraw: true
});

earth = new THREE.Mesh(earth_geom, earth_mat);
earth.castShadow = true;
scene.add(earth);

var orbit_earth_geom = new THREE.Geometry();
var earth_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 7500;
	vertex.z = Math.cos(Math.PI / 180 * i) * 7500;
	orbit_earth_geom.vertices.push(vertex);
}

var earth_orbit = new THREE.ParticleSystem(orbit_earth_geom, earth_orbit_mat);
earth_orbit.castShadow = true;
scene.add(earth_orbit);

//Mercury

var mercury, mercury_geom, mercury_mat;
mercury_geom = new THREE.SphereGeometry(90, 20, 20);

var mercury_texture = new THREE.TextureLoader().load('images/mercury.jpg');
mercury_texture.anisotropy = 8;
var mercury_mat = new THREE.MeshLambertMaterial({
	map: mercury_texture,
	overdraw: true
});

mercury = new THREE.Mesh(mercury_geom, mercury_mat);
mercury.castShadow = true;
scene.add(mercury);

var orbit_mercury_geom = new THREE.Geometry();
var mercury_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 3000;
	vertex.z = Math.cos(Math.PI / 180 * i) * 3000;
	orbit_mercury_geom.vertices.push(vertex);
}

var mercury_orbit = new THREE.ParticleSystem(orbit_mercury_geom, mercury_orbit_mat);
mercury_orbit.castShadow = true;
scene.add(mercury_orbit);

//venus

var venus, venus_geom, venus_mat;
venus_geom = new THREE.SphereGeometry(120, 20, 20);

var venus_texture = new THREE.TextureLoader().load('images/venus.jpg');
venus_texture.anisotropy = 8;
var venus_mat = new THREE.MeshLambertMaterial({
	map: venus_texture,
	overdraw: true
});

venus = new THREE.Mesh(venus_geom, venus_mat);
venus.castShadow = true;
scene.add(venus);

var orbit_vanus_geom = new THREE.Geometry();
var vanus_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 4500;
	vertex.z = Math.cos(Math.PI / 180 * i) * 4500;
	orbit_vanus_geom.vertices.push(vertex);
}

var vanus_orbit = new THREE.ParticleSystem(orbit_vanus_geom, vanus_orbit_mat);
vanus_orbit.castShadow = true;
scene.add(vanus_orbit);

//mars

var mars, mars_geom, mars_mat;
mars_geom = new THREE.SphereGeometry(75, 20, 20);

var mars_texture = new THREE.TextureLoader().load('images/mars.jpg');
mars_texture.anisotropy = 8;
var mars_mat = new THREE.MeshLambertMaterial({
	map: mars_texture,
	overdraw: true
});

mars = new THREE.Mesh(mars_geom, mars_mat);
mars.castShadow = true;
scene.add(mars);

var orbit_mars_geom = new THREE.Geometry();
var mars_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 9000;
	vertex.z = Math.cos(Math.PI / 180 * i) * 9000;
	orbit_mars_geom.vertices.push(vertex);
}

var mars_orbit = new THREE.ParticleSystem(orbit_mars_geom, mars_orbit_mat);
mars_orbit.castShadow = true;
scene.add(mars_orbit);

//jupiter

var jupiter, jupiter_geom, jupiter_mat;
jupiter_geom = new THREE.SphereGeometry(350, 20, 20);

var jupiter_texture = new THREE.TextureLoader().load('images/jupiter.jpg');
jupiter_texture.anisotropy = 8;
var jupiter_mat = new THREE.MeshLambertMaterial({
	map: jupiter_texture,
	overdraw: true
});

jupiter = new THREE.Mesh(jupiter_geom, jupiter_mat);
jupiter.castShadow = true;
scene.add(jupiter);

var orbit_jupiter_geom = new THREE.Geometry();
var jupiter_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

//Jupiter Rings
var ring_jupiter_main_geom = new THREE.Geometry();
var ring_jupiter_main_mat = new THREE.ParticleBasicMaterial({
	color: "#565656",
	opacity: 0.3,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 5000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * (750 - i / 90);
	vertex.y = Math.random() * 20;
	vertex.z = Math.cos(Math.PI / 180 * i) * (750 - i / 90);
	ring_jupiter_main_geom.vertices.push(vertex);
}

var ring_jupiter_main = new THREE.ParticleSystem(ring_jupiter_main_geom, ring_jupiter_main_mat);
ring_jupiter_main.castShadow = true;
scene.add(ring_jupiter_main);

var ring_jupiter_additional_geom = new THREE.Geometry();
var ring_jupiter_additional_mat = new THREE.ParticleBasicMaterial({
	color: "#dddddd",
	opacity: 0.3,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 5000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * (660 - i / 40);
	vertex.y = Math.random() * 20;
	vertex.z = Math.cos(Math.PI / 180 * i) * (660 - i / 40);
	ring_jupiter_additional_geom.vertices.push(vertex);
}

var ring_jupiter_additional = new THREE.ParticleSystem(ring_jupiter_additional_geom, ring_jupiter_additional_mat);
ring_jupiter_additional.castShadow = true;
scene.add(ring_jupiter_additional);

var ring_jupiter_additional_sub_geom = new THREE.Geometry();
var ring_jupiter_additional_sub_mat = new THREE.ParticleBasicMaterial({
	color: "#53365e",
	opacity: 0.3,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 5000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * (510 - i / 50);
	vertex.y = Math.random() * 20;
	vertex.z = Math.cos(Math.PI / 180 * i) * (510 - i / 50);
	ring_jupiter_additional_sub_geom.vertices.push(vertex);
}

var ring_jupiter_additional_sub = new THREE.ParticleSystem(ring_jupiter_additional_sub_geom, ring_jupiter_additional_sub_mat);
ring_jupiter_additional_sub.castShadow = true;
scene.add(ring_jupiter_additional_sub);

// Jupiter Orbit

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 11000;
	vertex.z = Math.cos(Math.PI / 180 * i) * 11000;
	orbit_jupiter_geom.vertices.push(vertex);
}

var jupiter_orbit = new THREE.ParticleSystem(orbit_jupiter_geom, jupiter_orbit_mat);
jupiter_orbit.castShadow = true;
scene.add(jupiter_orbit);

//saturn

var saturn, saturn_geom, saturn_mat;
saturn_geom = new THREE.SphereGeometry(200, 20, 20);

var saturn_texture = new THREE.TextureLoader().load('images/saturn.jpg');
saturn_texture.anisotropy = 8;
var saturn_mat = new THREE.MeshLambertMaterial({
	map: saturn_texture,
	overdraw: true
});

saturn = new THREE.Mesh(saturn_geom, saturn_mat);
saturn.castShadow = true;
saturn.rotation.z = Math.PI / 5;
scene.add(saturn);

var ring_saturn_geom = new THREE.Geometry();
var ring_saturn_mat = new THREE.PointCloudMaterial({
	color: "#421d00",
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 7000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * (550 - i / 40);
	vertex.y = Math.random() * 20;
	vertex.z = Math.cos(Math.PI / 180 * i) * (550 - i / 40);
	ring_saturn_geom.vertices.push(vertex);
}

var ring_saturn = new THREE.ParticleSystem(ring_saturn_geom, ring_saturn_mat);
ring_saturn.castShadow = true;
ring_saturn.rotation.z = Math.PI / 5;
scene.add(ring_saturn);

var orbit_saturn_geom = new THREE.Geometry();
var saturn_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 13500;
	vertex.z = Math.cos(Math.PI / 180 * i) * 13500;
	orbit_saturn_geom.vertices.push(vertex);
}

var saturn_orbit = new THREE.ParticleSystem(orbit_saturn_geom, saturn_orbit_mat);
saturn_orbit.castShadow = true;
scene.add(saturn_orbit);

//uranus

var uranus, uranus_geom, uranus_mat;
uranus_geom = new THREE.SphereGeometry(200, 20, 20);

var uranus_texture = new THREE.TextureLoader().load('images/uranus.jpg');
uranus_texture.anisotropy = 8;
var uranus_mat = new THREE.MeshLambertMaterial({
	map: uranus_texture,
	overdraw: true
});

uranus = new THREE.Mesh(uranus_geom, uranus_mat);
uranus.castShadow = true;
scene.add(uranus);

var orbit_uranus_geom = new THREE.Geometry();
var uranus_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 15000;
	vertex.z = Math.cos(Math.PI / 180 * i) * 15000;
	orbit_uranus_geom.vertices.push(vertex);
}

var uranus_orbit = new THREE.ParticleSystem(orbit_uranus_geom, uranus_orbit_mat);
uranus_orbit.castShadow = true;
scene.add(uranus_orbit);

//neptune

var neptune, neptune_geom, neptune_mat;
neptune_geom = new THREE.SphereGeometry(175, 20, 20);

var neptune_texture = new THREE.TextureLoader().load('images/neptune.jpg');
neptune_texture.anisotropy = 8;
var neptune_mat = new THREE.MeshLambertMaterial({
	map: neptune_texture,
	overdraw: true
});

neptune = new THREE.Mesh(neptune_geom, neptune_mat);
neptune.castShadow = true;
scene.add(neptune);

var orbit_neptune_geom = new THREE.Geometry();
var neptune_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 17000;
	vertex.z = Math.cos(Math.PI / 180 * i) * 17000;
	orbit_neptune_geom.vertices.push(vertex);
}

var neptune_orbit = new THREE.ParticleSystem(orbit_neptune_geom, neptune_orbit_mat);
neptune_orbit.castShadow = true;
scene.add(neptune_orbit);

//pluto

var pluto, pluto_geom, pluto_mat;
pluto_geom = new THREE.SphereGeometry(50, 20, 20);

var pluto_texture = new THREE.TextureLoader().load('images/pluto.jpg');
pluto_texture.anisotropy = 8;
var pluto_mat = new THREE.MeshLambertMaterial({
	map: pluto_texture,
	overdraw: true
});

pluto = new THREE.Mesh(pluto_geom, pluto_mat);
pluto.castShadow = true;
scene.add(pluto);

var orbit_pluto_geom = new THREE.Geometry();
var pluto_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0; i < 10000; i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI / 180 * i) * 20000;
	vertex.z = Math.cos(Math.PI / 180 * i) * 20000;
	orbit_pluto_geom.vertices.push(vertex);
}

var pluto_orbit = new THREE.ParticleSystem(orbit_pluto_geom, pluto_orbit_mat);
pluto_orbit.castShadow = true;
scene.add(pluto_orbit);

//render
render = new THREE.WebGLRenderer();
render.setSize(W, H);
render.setClearColor(0x000000, 1);
container.appendChild(render.domElement);
var t = 0;
var y = 0;
var x = 0;

document.addEventListener('mousemove', function (event) {
	y = parseInt(event.offsetY);
	x = parseInt(event.offsetX) - W / 2;
});

function animate() {
	requestAnimationFrame(animate);

	//rotation
	sun.rotation.y += 0.005;
	earth.rotation.y += planetSettings.earth.rotation;
	mercury.rotation.y += planetSettings.mercury.rotation;
	venus.rotation.y += planetSettings.venus.rotation;
	mars.rotation.y += planetSettings.mars.rotation;
	jupiter.rotation.y += planetSettings.jupiter.rotation;
	saturn.rotation.y += planetSettings.saturn.rotation;
	ring_saturn.rotation.y += planetSettings.saturn.rotation * 0.001;
	ring_jupiter_main.rotation.y += planetSettings.saturn.rotation;
	ring_jupiter_additional.rotation.y += planetSettings.saturn.rotation;
	ring_jupiter_additional_sub.rotation.y += planetSettings.saturn.rotation;
	uranus.rotation.y += planetSettings.uranus.rotation;
	neptune.rotation.y += planetSettings.neptune.rotation;
	pluto.rotation.y += planetSettings.pluto.rotation;

	//rings

	ring_saturn.position.x = saturn.position.x;
	ring_saturn.position.z = saturn.position.z;

	ring_jupiter_main.position.x = jupiter.position.x;
	ring_jupiter_main.position.z = jupiter.position.z;

	ring_jupiter_additional.position.x = jupiter.position.x;
	ring_jupiter_additional.position.z = jupiter.position.z;

	ring_jupiter_additional_sub.position.x = jupiter.position.x;
	ring_jupiter_additional_sub.position.z = jupiter.position.z;

	//Movement of the planets

	earth.position.x = Math.sin(t * planetSettings.earth.speedFactor) * planetSettings.earth.orbit;
	earth.position.z = Math.cos(t * planetSettings.earth.speedFactor) * planetSettings.earth.orbit;

	mercury.position.x = Math.sin(t * planetSettings.mercury.speedFactor) * planetSettings.mercury.orbit;
	mercury.position.z = Math.cos(t * planetSettings.mercury.speedFactor) * planetSettings.mercury.orbit;

	venus.position.x = Math.sin(t * planetSettings.venus.speedFactor) * planetSettings.venus.orbit;
	venus.position.z = Math.cos(t * planetSettings.venus.speedFactor) * planetSettings.venus.orbit;

	mars.position.x = Math.sin(t * planetSettings.mars.speedFactor) * planetSettings.mars.orbit;
	mars.position.z = Math.cos(t * planetSettings.mars.speedFactor) * planetSettings.mars.orbit;

	jupiter.position.x = Math.sin(t * planetSettings.jupiter.speedFactor) * planetSettings.jupiter.orbit;
	jupiter.position.z = Math.cos(t * planetSettings.jupiter.speedFactor) * planetSettings.jupiter.orbit;

	saturn.position.x = Math.sin(t * planetSettings.saturn.speedFactor) * planetSettings.saturn.orbit;
	saturn.position.z = Math.cos(t * planetSettings.saturn.speedFactor) * planetSettings.saturn.orbit;

	uranus.position.x = Math.sin(t * planetSettings.uranus.speedFactor) * planetSettings.uranus.orbit;
	uranus.position.z = Math.cos(t * planetSettings.uranus.speedFactor) * planetSettings.uranus.orbit;

	neptune.position.x = Math.sin(t * planetSettings.neptune.speedFactor) * planetSettings.neptune.orbit;
	neptune.position.z = Math.cos(t * planetSettings.neptune.speedFactor) * planetSettings.neptune.orbit;

	pluto.position.x = Math.sin(t * planetSettings.pluto.speedFactor) * planetSettings.pluto.orbit;
	pluto.position.z = Math.cos(t * planetSettings.pluto.speedFactor) * planetSettings.pluto.orbit;

	//Camera settings


	if (!isInfoShown) {
		camera.position.y = y * 14;
		camera.position.x = x * 21;
		camera.lookAt(scene.position);

		t += Math.PI / 180 * 7;
	}

	render.render(scene, camera);
}

animate();