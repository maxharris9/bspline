// use this for profiling

var bezier = require('./bezier');
var bezierFwDiff = require('./bezier-forward-diff');
var util = require('./util');

var oldInput = [ { x: 0, y: 0, z: 0 },
                 { x: 0, y: 0, z: 1 },
                 { x: 0, y: 1, z: 1 },
                 { x: 1, y: 1, z: 1 } ];

var newInput = [ [ 0, 0, 0 ],
                 [ 0, 0, 1 ],
                 [ 0, 1, 1 ],
                 [ 1, 1, 1 ] ];

var segments = 25;
var result = util.newZeroedArray(segments + 1); // n + 1 points define n segments

var iterations = 100;

for (var i = 0; i < iterations; i++) {
  bezierFwDiff.calcBezier(oldInput, segments);
}

for (var i = 0; i < iterations; i++) {
  bezier.calcBezier(result, newInput, segments);
}