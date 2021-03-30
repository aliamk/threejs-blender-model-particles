varying vec3 vPosition; // Passed from vertexShader

uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
    vec3 color = vec3(1.0, 0.0, 0.0);
    color = vec3(1.0, 1.0, 0.0);
    color.r = 0.0;

    float depth = vPosition.z * 0.5 + 0.5;

    color = mix(uColor1, uColor2, depth);

    gl_FragColor = vec4(color, depth * 0.3 + 0.2);
}