'use strict';

/**
 * @ngdoc filter
 * @name shuwoApp.filter:order
 * @function
 * @description
 * # order
 * Filter in the shuwoApp.
 */
angular.module('shuwoApp')
  .filter('orderStatus', function () {
    return function (input) {
      if (input == 0) {
        return '待确认';
      }
      if (input == 1) {
        return '已发货';
      }
      if (input == 2) {
        return '无效';
      }
      if (input == 3) {
        return '已收货';
      }
    };
  });
