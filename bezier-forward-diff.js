require('./vector.js');

// original: http://www.drdobbs.com/forward-difference-calculation-of-bezier/184403417?pgno=5
exports.calcBezier = function (q, steps) {
  // compute polynomial coefficients from Bezier points
  var a = sum( [ mult(q[0], -1), mult(q[1], 3), mult(q[2], -3), q[3] ] );
  var b = sum( [ mult(q[0], 3), mult(q[1], -6), mult(q[2], 3) ] );
  var c = add( mult(q[0], -3), mult(q[1], 3) );

  var h = 1.0 / steps; // compute our step size
  var h2 = h * h;
  var h3 = h2 * h;

  // compute forward differences from Bezier points and "h"
  var firstFD = sum( [ mult(a, h3), mult(b, h2), mult(c, h) ] );
  var thirdFD = mult(a, h3 * 6);
  var secondFD = add( thirdFD, mult(b, h2 * 2) );

  // compute points at each step
  var point = q[0];
  var result = [ point ];

  var stepCount = steps - 1;
  for (var i = 0; i < stepCount; i++) {
    point = add(point, firstFD);
    firstFD = add(firstFD, secondFD);
    secondFD = add(secondFD, thirdFD);

    result.push(point);
  }
  result.push(q[3]);

  return result;
}