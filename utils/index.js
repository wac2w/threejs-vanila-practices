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
