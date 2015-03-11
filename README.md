###example###

  var bezier = require('./bezier');
  var util = require('./util');

  var newInput = [ [ 0, 0, 0 ],
                   [ 0, 0, 1 ],
                   [ 0, 1, 1 ],
                   [ 1, 1, 1 ] ];

  var segments = 5;

  // preallocate the result array
  var result = util.newZeroedArray(segments + 1); // n + 1 points define n segments

  bezier.calcBezier(result, newInput, segments);