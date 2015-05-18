'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('OrderCtrl', ['$scope', 'page', 'order', 'configuration', 'shop',
    function ($scope, page, order, configuration, shop) {
      page.setFooterNav('order');

      $scope.shops = {};
      $scope.orders = [];
      $scope.start = 0;
      $scope.end = false;
      $scope.noneImage = configuration.imagePath + 'wan.png';
      var count = 10;

      $scope.confirmOrder = function (o) {
        if (confirm('请在收到水果后再确认收货，确认收货吗？')) {
          order.confirmOrder(o.orderid).success(function () {
            o.orderstatus = 3;
            alert('成功确认收货，谢谢您的支持！');
          });
        }
      };

      $scope.loadMore = function () {
        if ($scope.end) {
          return;
        }
        $scope.loading = true;
        order.listUserOrders($scope.start, count).success(function (data) {
          if (data.length == 0 || data.length < count) {
            $scope.end = true;
          }
          if (data.length > 0) {
            for (var i in data) {
              var shopId = data[i].shopid;
              if (!(shopId in $scope.shops)) {
                shop.getShopById(shopId).success(function (data) {
                  $scope.shops[data.shopid] = data;
                });
              }
            }
            $scope.orders.push.apply($scope.orders, data);
          }
          $scope.start += count;
          $scope.loading = false;
        }).error(function () {
          $scope.loading = false;
          $scope.start += count;
          $scope.end = true;
        });
      };

      $scope.isNaN = isNaN;


    }]);

angular.module('shuwoApp')
  .controller('OrderDetailCtrl', ['$scope', '$stateParams', 'order', 'page',
    function ($scope, $stateParams, order, page) {
      page.setFooterNav('order');

      var orderId = $stateParams.orderId;

      $scope.loading = true;

      order.getOrderById(orderId).success(function (data) {
        $scope.order = data;
        $scope.loading = false;
      }).error(function () {
        $scope.loading = false;
      });
    }]);
angular.module('shuwoApp')
  .controller('OrderSuccessCtrl', ['$scope', '$stateParams', 'order', 'page', 'shop',
    function ($scope, $stateParams, order, page, shop) {
      page.setFooterNav('order');

      var orderId = $stateParams.orderId;
      $scope.loading = true;

      order.getOrderById(orderId).success(function (data) {
        $scope.order = data;

        shop.getShopById(data.shopid).success(function (data) {
          $scope.shop = data;
          $scope.loading = false;
        });
      }).error(function () {
        $scope.loading = false;
      });
    }]);
