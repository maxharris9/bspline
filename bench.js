var bezier = require('./bezier');
var Benchmark = require('benchmark');
var bezierFwDiff = require('./bezier-forward-diff');

var suite = new Benchmark.Suite;

var input = [[0, 0, 0],
             [0, 0, 1],
             [0, 1, 1],
             [1, 1, 1]];

var p = [ { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 1, z: 1 },
          { x: 1, y: 1, z: 1 } ];

var runs = 25;

suite
.add('run with ' + runs + ' segments', function() {
  bezier.calcBezier(input, runs);
})
.add('run with old thing, ' + runs + ' segments', function () {
  bezierFwDiff.calcBezier(p, runs);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  // console.log('this:', this);
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': false });