
// Billboard的な動作を行うため、特定のObjectをカメラに向ける
const lookAtCamera = (object, camera) => {
  object.lookAt(camera.position);
}
