'use strict';

/**
 * @ngdoc filter
 * @name shuwoApp.filter:date
 * @function
 * @description
 * # date
 * Filter in the shuwoApp.
 */
angular.module('shuwoApp')
  .filter('expireDate', ['$filter', function ($filter) {
    return function (date) {
      date = date.replace("-", "/").replace("-", "/");
      var time = Date.parse(date);
      return $filter('date')(time, 'MM月dd日');
    };
  }]);
angular.module('shuwoApp')
  .filter('expireDateEver', ['$filter', function ($filter) {
    return function (b) {
      if (b.isever == 1 || b.isever == '1') {
        return '永久';
      }
      var date = b.expires.replace("-", "/").replace("-", "/");
      var time = Date.parse(date);
      return $filter('date')(time, 'MM月dd日');
    };
  }]);
angular.module('shuwoApp')
  .filter('leftDays', [function () {
    return function (b) {
      if (b.isever == 1 || b.isever == '1') {
        return '永久有效';
      }
      var date = b.expires;
      date = date.replace("-", "/").replace("-", "/");
      return (Math.floor((Date.parse(date) - new Date()) / 86400000) + 1) + '天后到期';
    };
  }]);
