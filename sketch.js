// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {

  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("black", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const loader=new THREE.TextureLoader();
  const texture = loader.load('earth.jpg');
  const moontexture=loader.load('doge.jpg');
  const belutexture=loader.load('belu.jpg');

  // Setup a material
  const material = new THREE.MeshStandardMaterial({
    map:texture,
  });

//group
  const moonGroup=new THREE.Group();

  const moonmaterial = new THREE.MeshStandardMaterial({
    map:moontexture,
  });
  

  const beluGroup=new THREE.Group();

  const belumaterial = new THREE.MeshStandardMaterial({
    map:belutexture,
  });
  
  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const moonmesh = new THREE.Mesh(geometry, moonmaterial);
  moonmesh.position.set(1,1,0);
  moonmesh.scale.setScalar(0.15);
  moonGroup.add(moonmesh);
  scene.add(moonGroup);


  const belumesh = new THREE.Mesh(geometry, belumaterial);
  belumesh.position.set(1,-1,0);
  belumesh.scale.setScalar(0.15);
  beluGroup.add(belumesh);
  scene.add(beluGroup);
  

  const light=new THREE.PointLight("white",1);
  light.position.set(2,2,-2);
  scene.add(light);
  // scene.add(new THREE.GridHelper(4,12));
  // scene.add(new THREE.PointLightHelper(light,0.15));

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      moonGroup.rotation.y=time*0.5;
      mesh.rotation.y=time*0.2;
      beluGroup.rotation.x=time*0.5;
      //  moonmesh.rotation.y=time*70;
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
