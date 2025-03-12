import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, stats, cube;

function init() {
  // シーンの作成
  scene = new THREE.Scene();

  // カメラの作成
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // レンダラーの作成
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // FPS表示
  stats = new Stats();
  document.body.appendChild(stats.dom);
}

const createObjects = function () {
  // 立方体の作成
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
};

// アニメーションの設定
const animate = function () {
  requestAnimationFrame(animate);

  // オブジェクトの回転
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  stats.update();

  renderer.render(scene, camera);
};

// シーン/レンダラの作成
init();
// オブジェクトの作成
createObjects();
// アニメーションの開始
animate();
