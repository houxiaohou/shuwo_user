'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:BaseCtrl
 * @description
 * # MainCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('BaseCtrl', ['$scope', 'location', 'geolocation', 'page',
    function ($scope, location, geolocation, page) {
      $scope.page = page;
      if (!location.getStoredLocation()) {
        // 如果没有保存过的地理位置，则获取
        geolocation.getLocation().then(function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          var point = new BMap.Point(lng, lat);
          new BMap.Geocoder().getLocation(point, function (rs) {
            var addComp = rs.addressComponents;
            var l = {
              name: addComp.district + addComp.street + addComp.streetNumber,
              lat: lat,
              lng: lng
            };
            location.setLocation(l);
          });
        });
      }
    }]);
