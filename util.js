exports.newZeroedArray = function  (length) {
  var result = new Array(length);
  for (var i = 0; i < length; i++) { result[i] = [ 0, 0, 0 ]; }
  return result;
};