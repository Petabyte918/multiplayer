
export function  angle2d(ax, ay, bx, by) {
    return Math.atan2(by - ay, bx - ax);
}

export function distance2d(startPosition, endPosition) {
  const aSquared = (startPosition.x - endPosition.x) ** 2;
  const bSquared = (startPosition.y - endPosition.y) ** 2;
  return Math.sqrt(aSquared + bSquared);
}

export function addDistance2d(startPosition, angle, distance) {
  const deltaY = Math.sin(angle) * distance;
  const deltaX = Math.cos(angle) * distance;
  return {
    x: startPosition.x + deltaX,
    y: startPosition.y + deltaY,
  };
}

export function getYFromXAndRadians(x, angle) {
  return x / Math.tan(angle);
}
