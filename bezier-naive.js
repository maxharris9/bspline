require('./vector.js');

// original: http://devmag.org.za/2011/04/05/bzier-curves-a-tutorial/
function calculateBezierPoint (t, p) {
  var u = 1 - t;
  var tt = t * t;
  var uu = u * u;
  var uuu = uu * u;
  var ttt = tt * t;

  var result = mult(p[0], uuu); // first term
  result = add(result, mult(p[1], 3 * uu * t)); // second term
  result = add(result, mult(p[2], 3 * u * tt)); // third term
  result = add(result, mult(p[3], ttt)); // fourth term

  return result;
}

exports.calcBezier = function (p, steps) {
  var q0 = calculateBezierPoint(0, p);
  var result = [];

  result.push(p[0]);

  for (var i = 1; i <= steps; i++) {
    var t = i / steps;
    var q1 = calculateBezierPoint(t, p);
    result.push(q1);
    q0 = q1;
  }

  return result;
};