'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('LocationCtrl', ['$scope', 'page', 'location', '$state', 'geolocation',
    function ($scope, page, location, $state, geolocation) {
      page.hideFooter();

      $scope.loading = false;
      $scope.currentLoading = true;
      $scope.noResults = false;

      $scope.keyword = '';
      $scope.results = [];
      $scope.current = {};

      geolocation.getLocation().then(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var gpsPoint = new BMap.Point(lng, lat);
        BMap.Convertor.translate(gpsPoint, translateCallback);

        function translateCallback(point) {
          new BMap.Geocoder().getLocation(point, function (rs) {
            var addComp = rs.addressComponents;
            $scope.current = {
              name: addComp.district + addComp.street + addComp.streetNumber,
              lat: point.lat,
              lng: point.lng
            };
            $scope.currentLoading = false;
            $scope.$apply();
          });
        }
      });

      $scope.currentLocation = function () {
        if (!$scope.current.name) {
          return;
        }
        confirmLocation($scope.current);
      };

      $scope.doSearch = function () {
        $scope.results = [];
        $scope.loading = true;
        $scope.noResults = false;

        var options = {
          pageCapacity: 20,
          onSearchComplete: function (results) {
            $scope.loading = false;
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
              for (var i = 0; i < results.getCurrentNumPois(); i++) {
                $scope.results.push(results.getPoi(i));
              }
            } else {
              $scope.noResults = true;
            }
            $scope.$apply();
          }
        };
        var local = new BMap.LocalSearch('上海市', options);
        local.search($scope.keyword);
      };

      $scope.changeLocation = function (result) {
        var position = {
          name: result.title,
          lat: result.point.lat,
          lng: result.point.lng
        };
        confirmLocation(position);
      };

      function confirmLocation(position) {
        location.setLocation(position);
        $state.go('shuwo.default');
      }

    }]);
