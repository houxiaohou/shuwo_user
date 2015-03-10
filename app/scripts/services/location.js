'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.location
 * @description
 * # location
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('location', ['$rootScope', 'storage',
    function location($rootScope, storage) {
      var location = undefined;
      return {
        getStoredLocation: function () {
          if (!location || !location.name || !location.lat || !location.lng) {
            if (storage.getItem('location')) {
              // 如果变量里面没有，从localstorage获取
              location = angular.fromJson(storage.getItem('location'));
            }
          }
          return location;
        },
        setLocation: function (l) {
          if ($rootScope.$root.$$phase != '$apply' && $rootScope.$root.$$phase != '$digest') {
            $rootScope.$apply(function () {
              location = l;
            });
          }
          else {
            location = l;
          }
          storage.setItem('location', angular.toJson(l));
        }
      }
    }]);
