'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.shop
 * @description
 * # shop
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('shop', ['constants', 'location', '$http', function shop(constants, location, $http) {
    return {
      listShopsNearBy: function (start, count) {
        start = start === undefined ? 0 : start;
        count = count === undefined ? 5 : count;
        var position = location.getStoredLocation();
        return $http.get(constants.API.shops, {
          params: {
            lat: position.lat,
            lng: position.lng,
            start: start,
            count: count
          }
        });
      },
      getShopById: function (id) {
        var position = location.getStoredLocation();
        return $http.get(constants.API.shop + '/' + id, {params: {lat: position.lat, lng: position.lng}});
      }
    }
  }]);
