'use strict';

/**
 * @ngdoc filter
 * @name shuwoApp.filter:price
 * @function
 * @description
 * # price
 * Filter in the shuwoApp.
 */
angular.module('shuwoApp')
  .filter('price', function () {
    return function (input) {
      return Number(input).toFixed(2);
    };
  });
