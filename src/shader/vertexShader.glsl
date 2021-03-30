varying vec3 vPosition; // pass position coordinates to fragmenShader
uniform float uTime; // pass time from index.js
uniform float uScale;
attribute vec3 aRandom; // pass randomness from model.js

void main() {
    vPosition = position;

    float time = uTime * 4.;

    vec3 pos = position; // Had to make a new variable bc imported ones can't be modified
    pos.x += sin(time * aRandom.x) * 0.05;
    pos.y += cos(time * aRandom.y) * 0.05;
    pos.z += cos(time * aRandom.z) * 0.05;

    pos.x *= uScale + (sin(pos.y * 4. + time) * (1. - uScale));
    pos.y *= uScale + (sin(pos.z * 4. + time) * (1. - uScale));
    pos.z *= uScale + (sin(pos.x * 4. + time) * (1. - uScale));

    pos *=uScale;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 8.0 / -mvPosition.z;
}