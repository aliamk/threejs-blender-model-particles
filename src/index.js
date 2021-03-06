import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './model'

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
  50, 
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 0;
camera.position.y = 4;

/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial( { 
  color: 0x00ff00,
} );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls( camera, renderer.domElement );
controls.enabled = false

/*------------------------------
MouseMove
------------------------------*/
function onMouseMove(e) {
  console.log(e)
  const x = e.clientX
  const y = e.clientY

  gsap.to(scene.rotation, {
    y: gsap.utils.mapRange(0, window.innerWidth, .10, -.2, y),
    x: gsap.utils.mapRange(0, window.innerWidth, .10, -.2, x)
  })
}
window.addEventListener('mousemove', onMouseMove)


/*------------------------------
Models
------------------------------*/
const letterA = new Model({
  name: 'letterA',
  file: './models/letter_a.glb',
  scene: scene,
  color1: '#f72585',
  color2: 'black',
  background: '#4c96f7',
  placeOnLoad: true
})

const letterB = new Model({
  name: 'letterB',
  file: './models/letter_b.glb',
  color1: '#ffd6e0',
  color2: '#450920',
  background: '#1985a1',
  scene: scene  
})

/*------------------------------
Controllers
------------------------------*/
const buttons = document.querySelectorAll('.button')
buttons[0].addEventListener('click', () => {
  letterA.add()
  letterB.remove()
})
buttons[1].addEventListener('click', () => {
  letterA.remove()
  letterB.add()
})

/*------------------------------
Clock
------------------------------*/
const clock = new THREE.Clock()

/*------------------------------
Loop
------------------------------*/
const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

  if (letterA.isActive) {
    letterA.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  }
  if (letterB.isActive) {
    letterB.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  }
  
};
animate();


/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );