import * as THREE from 'three';

/**
 * 最も遠い距離を返す
 * @param {THREE.Vector3} target 
 * @param {Array<THREE.Vector3>} positions 
 */
export const getFarthestDistance = (target, positions) => {
  let farthestDistance = 0;
  positions.forEach((position) => {
    const distance = target.distanceTo(position);
    if (distance > farthestDistance) {
      farthestDistance = distance;
    }
  });
  return farthestDistance;
}


/**
 * Sphereの頂点を取得する
 * @param {THREE.SphereMesh} sphereMesh
 */
export const getSphereVertices = (sphereMesh) => {
  const geometry = sphereMesh.geometry;
  const poss = []; // THREE.Vector3の配列
  const vertexIndexes = []
  const vertices = geometry.attributes.position.array;
  const stride = geometry.attributes.position.itemSize;
  for (let i = 0; i < vertices.length; i += stride) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = vertices[i + 2];
    const v = new THREE.Vector3(x, y, z);
    v.applyMatrix4(sphereMesh.matrixWorld);
    poss.push(v);
  }
  return poss;
}

