var bezier = require('./bezier');
var Benchmark = require('benchmark');
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

var segments = 5;

var result = util.newZeroedArray(segments + 1); // n + 1 points define n segments

var suite = new Benchmark.Suite;
suite
  .add('run with old thing, ' + segments + ' segments', function () {
    bezierFwDiff.calcBezier(oldInput, segments);
  })
  .add('run with new thing, ' + segments + ' segments', function() {
    bezier.calcBezier(result, newInput, segments);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  .run({ 'async': false });