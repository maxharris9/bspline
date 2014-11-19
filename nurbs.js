// translation of Rob Bateman's nurbs demo - http://nccastaff.bournemouth.ac.uk/jmacey/RobTheBloke/www/opengl_programming.html
function coxDeBoor (u, i, k, knots) {
  if (k === 1) {
    if ((knots[i] <= u) && (u <= knots[i + 1])) {
      return 1.0;
    }
    return 0.0;
  }

  var den1 = knots[i + k - 1] - knots[i];
  var den2 = knots[i + k] - knots[i + 1];
  var eq1 = 0, eq2 = 0;

  if (den1 > 0) {
    eq1 = ((u - knots[i]) / den1) * coxDeBoor(u, i, k - 1, knots);
  }

  if (den2 > 0) {
    eq2 = (knots[i + k] - u) / den2 * coxDeBoor(u, i + 1, k - 1, knots);
  }

  return eq1 + eq2;
}

function getOutpoint (t, outPoint, constants) {
  // sum the effect of all control points on the curve at this point to get the evaluated curve point
  for (var i = 0; i !== constants.controlPointCount; ++i) {

    // calculate the effect of this point on the curve
    var val = coxDeBoor(t, i, constants.order, constants.knots);

    if (val > 0.001) {
      // sum effect of control points on this part of the curve
      outPoint.x += val * constants.controlPoints[i].x;
      outPoint.y += val * constants.controlPoints[i].y;
      outPoint.z += val * constants.controlPoints[i].z;
    }
  }

  return outPoint;
}

exports.calcNurbs = function (controlPoints, knots, degree, lod) {
  var results = [];

  var constants = {
    controlPoints: controlPoints,
    knots: knots,
    controlPointCount: controlPoints.length,
    order: degree + 1,
    knotCount: controlPoints.length + (degree + 1)
  };

  if (constants.knotCount !== knots.length) {
    console.log('error: knot count should equal control point count + (degree + 1); check your input');
  }

  for (var i = 0; i !== lod; ++i) {
    var t = knots[constants.knotCount - 1] * i / (lod - 1);

    if (i === lod - 1) {
      t -= 0.001;
    }

    var outPoint = { x: 0, y: 0, z: 0 };
    results.push(getOutpoint(t, outPoint, constants));
  }

  return results;
};