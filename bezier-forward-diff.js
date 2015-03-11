var vector = require('./vector.js');

// original: http://www.drdobbs.com/forward-difference-calculation-of-bezier/184403417?pgno=5
exports.calcBezier = function (q, steps) {
  // compute polynomial coefficients from Bezier points
  var a = vector.sum( [ vector.mult(q[0], -1), vector.mult(q[1], 3), vector.mult(q[2], -3), q[3] ] );
  var b = vector.sum( [ vector.mult(q[0], 3), vector.mult(q[1], -6), vector.mult(q[2], 3) ] );
  var c = vector.add( vector.mult(q[0], -3), vector.mult(q[1], 3) );

  var h = 1.0 / steps; // compute our step size
  var h2 = h * h;
  var h3 = h2 * h;

  // compute forward differences from Bezier points and "h"
  var firstFD = vector.sum( [ vector.mult(a, h3), vector.mult(b, h2), vector.mult(c, h) ] );
  var thirdFD = vector.mult(a, h3 * 6);
  var secondFD = vector.add( thirdFD, vector.mult(b, h2 * 2) );

  // compute points at each step
  var point = q[0];
  var result = [ point ];

  var stepCount = steps - 1;
  for (var i = 0; i < stepCount; i++) {
    point = vector.add(point, firstFD);
    firstFD = vector.add(firstFD, secondFD);
    secondFD = vector.add(secondFD, thirdFD);

    result.push(point);
  }
  result.push(q[3]);

  return result;
}