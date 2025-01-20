// src/adapters/ThreeJsAdapter.js

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vProjUV;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vProjUV = (clipPos.xy / clipPos.w) * 0.5 + 0.5;
    gl_Position = clipPos;
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vProjUV;
  uniform vec3 lightPosition;
  uniform vec3 lightColor;
  uniform vec3 objectColor;
  uniform sampler2D uTexture;
  uniform bool useTexture;
  void main() {
    vec3 lightDir = normalize(lightPosition - vPosition);
    float diff = max(dot(normalize(vNormal), lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    vec3 lightingColor = diffuse * objectColor;
    vec3 texColor = vec3(1.0);
    if(useTexture) {
      vec2 uv = clamp(vProjUV, 0.0, 1.0);
      texColor = texture2D(uTexture, uv).rgb;
    }
    vec3 finalColor = lightingColor * texColor;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export class ThreeJsAdapter {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    
    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        lightPosition: { value: new THREE.Vector3(10, 10, 10) },
        lightColor: { value: new THREE.Color(1, 1, 1) },
        objectColor: { value: new THREE.Color(0, 1, 0) },
        uTexture: { value: null },
        useTexture: { value: false }
      }
    });
    
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), this.shaderMaterial);
    this.scene.add(this.cube);
    const gridHelper = new THREE.GridHelper(20, 20);
    this.scene.add(gridHelper);
    
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);
    
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  attachToDOM(parent = document.body) {
    parent.appendChild(this.renderer.domElement);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  applyImageProjection(imageProjection) {
    const img = new Image();
    img.onload = () => {
      const texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      this.shaderMaterial.uniforms.uTexture.value = texture;
      this.shaderMaterial.uniforms.useTexture.value = true;
    };
    img.src = imageProjection.imageURL;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
