'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.geolocation
 * @description
 * # geolocation
 * Factory in the shuwoApp.
 */
angular.module('shuwoApp')
  .factory('geolocation', ['$q', '$rootScope', '$window', function ($q, $rootScope, $window) {
    return {
      getLocation: function (opts) {
        var deferred = $q.defer();
        if ($window.navigator && $window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition(function (position) {
            $rootScope.$apply(function () {
              deferred.resolve(position);
            });
          }, function (error) {
            switch (error.code) {
              case 1:
                $rootScope.$broadcast('error', 'You have rejected access to your location');
                $rootScope.$apply(function () {
                  deferred.reject('You have rejected access to your location');
                });
                break;
              case 2:
                $rootScope.$broadcast('error', 'Unable to determine your location');
                $rootScope.$apply(function () {
                  deferred.reject('Unable to determine your location');
                });
                break;
              case 3:
                $rootScope.$broadcast('error', 'Service timeout has been reached');
                $rootScope.$apply(function () {
                  deferred.reject('Service timeout has been reached');
                });
                break;
            }
          }, opts);
        }
        else {
          $rootScope.$broadcast('error', 'Browser does not support location services');
          $rootScope.$apply(function () {
            deferred.reject('Browser does not support location services');
          });
        }
        return deferred.promise;
      }
    };
  }]);
