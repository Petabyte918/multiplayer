
export function  angle2d(ax, ay, bx, by) {
    return Math.atan2(by - ay, bx - ax);
}

// These are terrible.
// see: https://en.wikipedia.org/wiki/Linear_interpolation
// export function lerp1d(start, end, delta) {
//   return ( start.y * (end.x - delta) + end.y * (delta - start.x) ) / (end.x - start.x);
// }

// export function lerp2d(startPosition, endPosition, delta) {
//   return { 
//     x: lerp1d(startPosition.x, endPosition.x, delta),
//     y: lerp1d(startPosition.y, endPosition.y, delta),
//   }
// }

export function distance2d(startPosition, endPosition) {
  const aSquared = Math.pow(startPosition.x - endPosition.x, 2);
  const bSquared = Math.pow(startPosition.y - endPosition.y, 2);
  return Math.sqrt(aSquared + bSquared);
}
