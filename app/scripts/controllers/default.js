'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:DefaultCtrl
 * @description
 * # DefaultCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('DefaultCtrl', ['$scope', 'page', 'location', 'shop', 'bridge', 'configuration',
    function ($scope, page, location, shop, bridge, configuration) {
      page.showFooter();
      page.setFooterNav('shop');

      $scope.banner = configuration.imagePath + 'banner.jpg';

      $scope.locationLoading = true;
      $scope.$watch(function () {
        return location.getStoredLocation();
      }, function (newVal, oldVal) {
        if (newVal !== undefined) {
          $scope.locationLoading = false;
          $scope.location = location.getStoredLocation();
        }
      });

      $scope.shopLoading = true;
      $scope.location = location.getStoredLocation();
      // location变化的话重新获取店铺
      $scope.$watch('location', function (newVal, oldVal) {
        if (newVal !== undefined) {
          shop.listShopsNearBy(0, 5).success(function (data) {
            $scope.shops = data;
            $scope.shopLoading = false;
          }).error(function() {
            $scope.shops = [];
            $scope.loading = false;
          });
        }
      });

      // 点击店铺链接去店铺详情页
      $scope.toShop = function (s) {
        bridge.setObject('shop', s);
      }
    }]);