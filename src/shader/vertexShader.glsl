varying vec3 vPosition; // pass position coordinates to fragmenShader
uniform float uTime; // pass time from index.js
uniform float uScale;
attribute vec3 aRandom; // pass randomness from model.js

void main() {
    vPosition = position;

    float time = uTime * 4.;

    vec3 pos = position; // Had to make a new variable bc imported ones can't be modified
    pos.x += 1. * sin(time * aRandom.x) * 0.05;
    pos.y += 1. * cos(time * aRandom.y) * 0.05;
    pos.z += 1. * cos(time * aRandom.z) * 0.05;

    pos.x *= uScale + (sin(pos.y * 8. + time) * (1. - uScale));
    pos.y *= uScale + (sin(pos.z * 8. + time) * (1. - uScale));
    pos.z *= uScale + (sin(pos.x * 8. + time) * (1. - uScale));

    pos *=uScale;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 12.0 / -mvPosition.z;
}