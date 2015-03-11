```
  var bez_naive = require('../../../bspline/bezier-naive.js'); // at the moment, I'm keeping bspline in a folder next to livecad/
  var bez_fast = require('../../../bspline/bezier-forward-diff.js');
  var logger = require('../../../bspline/vector.js');
  var nurbs = require('../../../bspline/nurbs.js');

  var p = [ { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 1, z: 1 },
          { x: 1, y: 1, z: 1 } ];

  var p2 = [ { x: 0, y: 0, z: 0 },
          { x: 0, y: 1, z: 0 },
          { x: 1, y: 1, z: 0 },
          { x: 1, y: 0, z: 1 } ];

  var p3 = [ { x: 0, y: 0, z: 0 },
          { x: 0, y: 1, z: 1 },
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 1, z: 0 } ];

  var p4 = [ { x: 0, y: 0, z: 0 },
          { x: 0, y: 1, z: 0 },
          { x: 1, y: 1, z: 0 },
          { x: 1, y: 0, z: 0 } ];

  var steps = 18;

  console.log('naive:', bez_naive.calcBezier(p2, steps));
  console.log('-----------------------');
  console.log('fast:', bez_fast.calcBezier(p2, steps));
  
  var controlPoints = [
    { x:  10, y: 10, z:  0 },
    { x:   5, y: 10, z:  2 },
    { x:  -5, y:  5, z:  0 },
    { x: -10, y:  5, z: -2 },
    { x:  -4, y: 10, z:  0 },
    { x:  -4, y:  5, z:  2 },
    { x:  -8, y:  1, z:  0 }
  ];
  var knots = [ 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 3.0, 4.0, 4.0, 4.0, 4.0 ];

  var result = nurbs.calcNurbs(controlPoints, knots, 3, 200);
  logger.dumpToCsv(result);
```
