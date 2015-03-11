exports.mult = function (v, scalar) {
  return {
    x: v.x * scalar,
    y: v.y * scalar,
    z: v.z * scalar
  };
};

exports.add = function (v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z
  };
};

exports.sum = function (vectorList) {
  var result = { x: 0, y: 0, z: 0 };

  for (var i = 0; i < vectorList.length; i++) {
    result = this.add(result, vectorList[i]);
  }
  return result;
};

exports.dumpToCsv = function (pointList) {
  for (var i = 0; i < pointList.length; i++) {
    console.log(pointList[i].x + ', ' + pointList[i].y + ', ' + pointList[i].z);
  }
};