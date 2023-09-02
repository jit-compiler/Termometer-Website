import * as THREE from "three";

const scene = new THREE.Scene();
let scene2 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const canvas = document.getElementById("three");
const canvas2 = document.getElementById("three2");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });

// User inputs

let rotationXElement = document.getElementById("x");
let rotationYElement = document.getElementById("y");
let rotationZElement = document.getElementById("z");

let rotationXValue = rotationXElement.value;
let rotationYValue = rotationYElement.value;
let rotationZValue = rotationZElement.value;

rotationXElement.addEventListener("input", (event) => {
  rotationXValue = event.target.value;
});

rotationYElement.addEventListener("input", (event) => {
  rotationYValue = event.target.value;
});

rotationZElement.addEventListener("input", (event) => {
  rotationZValue = event.target.value;
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer2.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
document.body.appendChild(renderer2.domElement);

const geometry = new THREE.BoxGeometry(14, 14, 14);
const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(
    "./Saul.webp",
    () => {
      console.log("Texture loaded successfully.");
      renderer.render(scene, camera);
    },
    () => {
      console.log("Error loading texture.");
    }
  ),
});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

const geometry2 = new THREE.BoxGeometry(14, 14, 14);
const material2 = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(
    "./Saul.webp",
    () => {
      console.log("Texture loaded successfully.");
      renderer.render(scene, camera);
      renderer2.render(scene, camera);
    },
    () => {
      console.log("Error loading texture.");
    }
  ),
});
const box2 = new THREE.Mesh(geometry2, material2);
scene2.add(box2);

camera.position.z = 20;
renderer.setClearColor(0xffffff, 0);
renderer2.setClearColor(0xffffff, 0);
renderer.setSize(600, 300);
renderer2.setSize(600, 300);

function animate() {
  requestAnimationFrame(animate);
  box.rotation.y -= rotationYValue / 1000;
  box.rotation.x -= rotationXValue / 1000;
  box.rotation.z += rotationZValue / 1000;
  box2.rotation.y += rotationYValue / 1000;
  box2.rotation.x -= rotationXValue / 1000;
  box2.rotation.z -= rotationZValue / 1000;

  renderer.render(scene, camera);
  renderer2.render(scene2, camera); // Render box2 on the new renderer
}

animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  if (window.innerWidth < 1000) {
    // Stop rendering to the second canvas and hide it
    canvas2.style.display = "none";
  } else {
    // Continue rendering to the second canvas and show it if the window width is >= 1000
    canvas2.style.display = "block";
    scene2 = new THREE.Scene(); // consider re-creating the scene or storing it instead of setting it to null
    scene2.add(box2); // add box2 back to scene2
  }

  if (window.innerWidth <= 600) {
    // Set the renderer size to match the new window size
    renderer.setSize(300, 300);
    renderer2.setSize(300, 300);

    // Update the camera aspect ratio
    camera.aspect = window.innerWidth / (window.innerHeight / 2);
  } else {
    // Revert back to the initial settings when the window is resized back beyond 600px
    renderer.setSize(600, 300);
    renderer2.setSize(600, 300);

    // update aspect ratio for sizes greater than 600
    camera.aspect = 600 / 300;
  }

  // Update the camera's projection matrix
  camera.updateProjectionMatrix();
}
