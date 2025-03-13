

import * as THREE from 'three';

export const createSphere = ({radius=1, widthSegments=32, heightSegments=32, position = {x: 0, y: 0, z: 0}, wireframe = false, color = 0x00ff00}) => {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const material = new THREE.MeshBasicMaterial({ color, wireframe });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(position.x, position.y, position.z);
  return sphere;
}
