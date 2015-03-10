'use strict';

/**
 * @ngdoc filter
 * @name shuwoApp.filter:distance
 * @function
 * @description
 * # distance
 * Filter in the shuwoApp.
 */
angular.module('shuwoApp')
  .filter('distance', function () {
    return function (input) {
      // 距离的filter
      if (isNaN(Number(input))) {
        return '未知';
      }
      if (input < 500) {
        return '<500m';
      }
      if (input < 1000) {
        return input + 'm';
      }
      if (input <= 2000) {
        var distance = new Number(input / 1000).toFixed(2);
        if (distance == 1) {
          return '1km';
        }
        return distance + 'km';
      }
      if (input > 2000) {
        return '>2km';
      }
      return 'distance filter: ' + input;
    };
  });
