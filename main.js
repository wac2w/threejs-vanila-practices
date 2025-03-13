import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

let scene, camera, renderer, stats, sphere, sphereVertices, group;
let isDragging = false;
let prevDrag = { x: 0, y: 0 };
let curDrag = { x: 0, y: 0 };

function init() {
  // シーンの作成
  scene = new THREE.Scene();

  // カメラの作成
  // orthographic camera
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 5;

  // レンダラーの作成
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // FPS表示
  stats = new Stats();
  document.body.appendChild(stats.dom);

  // カメラコントロールの作成
  addDragEventListeners();
}

const addDragEventListeners = () => {
  // X方向, Y方向のドラッグ量を計算
  const calcDrag = (e) => {
    if (!isDragging) return;
    // 変化量がほぼ変わっていない場合は無視
    curDrag.x = e.clientX - prevDrag.x;
    curDrag.y = e.clientY - prevDrag.y;
    prevDrag.x = e.clientX;
    prevDrag.y = e.clientY;
  }
  // pointerdownイベント
  const pointerdown = (e) => {
    prevDrag.x = e.clientX;
    prevDrag.y = e.clientY;
    isDragging = true;
  }
  // pointermoveイベント
  const pointermove = (e) => {
    calcDrag(e);
  }
  // pointerupイベント
  const pointerup = (e) => {
    // リセット
    curDrag.x = 0;
    curDrag.y = 0;
    isDragging = false;
  }
  window.addEventListener('pointerdown', pointerdown);
  window.addEventListener('pointermove', pointermove);
  window.addEventListener('pointerup', pointerup);
}

// 球体の頂点座標を取得
const getVertexFromSphere = () => {
  // 球体の頂点座標を取得
  const geometry = sphere.geometry;
  const positionAttribute = geometry.attributes.position;
  const vertices = [];
  const widthSegments = geometry.parameters.widthSegments;
  const heightSegments = geometry.parameters.heightSegments;

  // 上極 (index 0)
  vertices.push(new THREE.Vector3().fromBufferAttribute(positionAttribute, 0));
    
  // 中間の緯度線上の頂点
  for (let h = 1; h < heightSegments; h++) { // 1 から heightSegments - 1 まで
    const start = h * (widthSegments + 1);
    for (let w = 0; w < widthSegments; w++) {
      const index = start + w;
      vertices.push(new THREE.Vector3().fromBufferAttribute(positionAttribute, index));
    }
  }

  // 下極 (最後)
  vertices.push(new THREE.Vector3().fromBufferAttribute(positionAttribute, positionAttribute.count -1 ));

  // ワールド座標に変換
  sphereVertices = vertices.map(v => v.clone().applyMatrix4(sphere.matrixWorld));
}

const createImage = (imagePath, position, width) => {
  const texture = new THREE.TextureLoader();
  texture.load(imagePath, (texture) => {
    const aspectRatio = texture.image.width / texture.image.height;
    const height = width / aspectRatio;
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(width, height, 1);
    sprite.position.set(position.x, position.y, position.z);
    if (group) group.add(sprite);
  });
}

const createFog = () => {
  scene.fog = new THREE.Fog(0x000, 4.1, 6);
}

const createLights = () => {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xFFF, 10);
  scene.add(ambientLight);
}


const createObjects = function () {
  createLights();
  group = new THREE.Group();
  const geometry = new THREE.SphereGeometry(1, 6, 3);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  sphere = new THREE.Mesh(geometry, material);
  sphere.visible = false;
  group.add(sphere);
  scene.add(group);
  getVertexFromSphere();
  sphereVertices.forEach((v, i) => {
    const imagePath = `./images/${i+1}.png`;
    createImage(imagePath, v, 0.3);
  });
  createFog();
};


// アニメーションの設定
const animate = function () {
  requestAnimationFrame(animate);

  if (isDragging) {
    group.rotation.y += curDrag.x * 0.01;
    group.rotation.x += curDrag.y * 0.01;
  }

  stats.update();

  renderer.render(scene, camera);
};

// シーン/レンダラの作成
init();
// オブジェクトの作成
createObjects();
// アニメーションの開始
animate();
