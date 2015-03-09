var vec3scale = require('gl-vec3/scale');
var vec3add = require('gl-vec3/add');
var vec3scaleAndAdd = require('gl-vec3/scaleAndAdd');

// forward-differencing

// original: http://www.drdobbs.com/forward-difference-calculation-of-bezier/184403417?pgno=5
exports.calcBezier = function (input, steps) {
  var a = [0, 0, 0];
  var b = [0, 0, 0];
  var c = [0, 0, 0];
  var firstFD = [0, 0, 0];
  var thirdFD = [0, 0, 0];
  var secondFD = [0, 0, 0];

  var h = 1.0 / steps; // compute our step size
  var h2 = h * h;
  var h3 = h2 * h;

  // compute polynomial coefficients from Bezier points
  vec3scale(a, input[0], -1);
  vec3scaleAndAdd(a, a, input[1], 3);
  vec3scaleAndAdd(a, a, input[2], -3);
  vec3add(a, a, input[3]);

  vec3scale(b, input[0], 3);
  vec3scaleAndAdd(b, b, input[1], -6);
  vec3scaleAndAdd(b, b, input[2], 3);

  vec3scale(c, input[0], -3);
  vec3scaleAndAdd(c, c, input[1], 3);

  // compute forward differences from Bezier points and "h"
  vec3scale(firstFD, a, h3);
  vec3scaleAndAdd(firstFD, firstFD, b, h2);
  vec3scaleAndAdd(firstFD, firstFD, c, h);

  vec3scale(thirdFD, a, h3 * 6);
  vec3scale(secondFD, b, h2 * 2);
  vec3add(secondFD, secondFD, thirdFD);

  // compute points at each step
  var point = [input[0][0], input[0][1], input[0][2]];
  var result = new Array(steps);
  result[0] = [input[0][0], input[0][1], input[0][2]];

  var stepCount = steps - 1;
  for (var i = 0; i < stepCount; i++) {
    vec3add(point, point, firstFD);
    vec3add(firstFD, firstFD, secondFD);
    vec3add(secondFD, secondFD, thirdFD);

    result[i + 1] = [point[0], point[1], point[2]];
  }
  result[steps] = [input[3][0], input[3][1], input[3][2]];

  return result;
};