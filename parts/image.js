import * as THREE from 'three';

// Billboardとして作成
// https://github.com/pmndrs/drei-vanilla/blob/main/.storybook/stories/Billboard.stories.ts
export function createImage(url, position, scale) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  return new THREE.Mesh(geometry, material);
}
