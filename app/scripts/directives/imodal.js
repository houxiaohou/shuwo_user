'use strict';

/**
 * @ngdoc directive
 * @name shuwoApp.directive:imodal
 * @description
 * # imodal
 */
angular.module('shuwoApp')
  .directive('imodal', function () {
    return {
      restrict: 'EAC',
      scope: {
        imodal: '='
      },
      link: function postLink(scope, element, attrs) {
        var src = undefined;
        scope.$watch('imodal', function(newVal, oldVal) {
          if (newVal !== undefined) {
            src = newVal;
          }
        });

      }
    };
  });
