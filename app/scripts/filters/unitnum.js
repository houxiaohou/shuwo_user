'use strict';

/**
 * @ngdoc filter
 * @name shuwoApp.filter:unitnum
 * @function
 * @description
 * # unitnum
 * Filter in the shuwoApp.
 */
angular.module('shuwoApp')
  .filter('unitnum', function () {
    return function (input) {
      input = Number(input);
      if (input <= 500) {
        return Math.round(parseFloat(500 / input));
      }
    };
  });
