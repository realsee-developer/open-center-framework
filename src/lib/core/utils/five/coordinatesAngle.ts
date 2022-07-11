import { coordinatesToVector } from './coordinatesToVector'

/**
 * @description: 获取coordinates间的夹角
 * @return {number} 夹角角度
 */
function coordinatesAngle(
  coordinates1: { longitude: number; latitude: number },
  coordinates2: { longitude: number; latitude: number },
): number {
  const vector1 = coordinatesToVector(coordinates1)
  const vector2 = coordinatesToVector(coordinates2)
  const angle = vector1.angleTo(vector2)
  return angle
}

export { coordinatesAngle }
