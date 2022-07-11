import * as THREE from 'three'

/** 坐标转换成单位向量 */
function coordinatesToVector(coordinates: { longitude: number; latitude: number }): THREE.Vector3 {
  const distance = Math.abs(Math.cos(coordinates.latitude))
  return new THREE.Vector3(
    /* x */ -Math.sin(coordinates.longitude) * distance,
    /* y */ -Math.sin(coordinates.latitude),
    /* z */ -Math.cos(coordinates.longitude) * distance,
  )
}

export { coordinatesToVector }
