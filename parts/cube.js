

import * as THREE from 'three';

export function createBox({color = 0x00ff00, position = {x: 0, y: 0, z: 0}}) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(position.x, position.y, position.z);
  return cube;
}
