define(function(require){
  function merge() {
    'use strict';
    var i = 0;
    var n = arguments.length;
    var combined = {};

    for (i; i<n; i++) {
      for (var key in arguments[i]) {
        combined[key] = arguments[i][key];
      }
    }
    return combined;
  }

  return merge;
});
