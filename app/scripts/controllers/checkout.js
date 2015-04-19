'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('CheckoutCtrl', ['$scope', '$state', 'address', 'bridge', 'storage', 'page', 'order', 'cart', 'shop', 'geolocation',
    function ($scope, $state, address, bridge, storage, page, order, cart, shop, geolocation) {
      page.hideFooter();

      geolocation.getLocation().then(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var gpsPoint = new BMap.Point(lng, lat);
        BMap.Convertor.translate(gpsPoint, translateCallback);

        function translateCallback(point) {
          console.log(point);
          new BMap.Geocoder().getLocation(point, function (rs) {
            $scope.lat = point.lat;
            $scope.lng = point.lng;
          });
        }
      });

      $scope.notes = '';
      $scope.addressLoading = true;
      $scope.submitting = false;
      $scope.ispickup = 0;

      $scope.lat = 0;
      $scope.lng = 0;

      $scope.choseDelivery = function (i) {
        $scope.ispickup = i;
      };

      // 获取默认送货地址
      if (bridge.getAddress()) {
        $scope.address = bridge.getAddress();
        $scope.addressLoading = false;
      } else {
        address.getDefaultAddress().success(function (data) {
          $scope.address = data;
          $scope.addressLoading = false;
          if (data.length == 0) {
            $state.go('shuwo.address.add');
          }
        }).error(function () {
          $state.go('shuwo.address.add');
          $scope.addressLoading = false;
        });
      }

      // 获取订单产品
      var orderObject = storage.getItem('order');
      if (!orderObject) {
        // 显示没有产品
        $state.go('shuwo.cart');
      } else {
        var obj = angular.fromJson(orderObject);
        $scope.shopid = obj.shopid;

        shop.getShopById($scope.shopid).success(function (data) {
          $scope.shop = data;
        });

        $scope.items = obj.items;
        $scope.totalPrice = function () {
          var total = 0.00;
          for (var i in $scope.items) {
            total += $scope.items[i].price;
          }
          return total;
        };
      }

      // 送货时间
      $scope.times = [
        {label: '立即送出', value: 0},
        {label: '8:00-10:00', value: 1},
        {label: '10:00-12:00', value: 2},
        {label: '12:00-14:00', value: 3},
        {label: '14:00-16:00', value: 4},
        {label: '16:00-18:00', value: 5},
        {label: '18:00-20:00', value: 6},
        {label: '20:00-22:00', value: 7}
      ];
      $scope.selectedTime = $scope.times[0];

      // 提交订单
      $scope.submit = function () {

        if ($scope.address === undefined || $scope.address.said === 0) {
          alert('配送地址不正确，请重新确认送货地址');
          return;
        }

        $scope.submitting = true;

        var orderdetail = [];
        for (var i in $scope.items) {
          var item = $scope.items[i];
          orderdetail.push({
            productid: item.productId,
            quantity: item.num
          });
        }

        var o = {
          said: $scope.address.said,
          shopid: $scope.shopid,
          orderdetail: JSON.stringify(orderdetail),
          dltime: $scope.selectedTime.label,
          notes: $scope.notes,
          ispickup: $scope.ispickup,
          lat: $scope.lat,
          lng: $scope.lng
        };
        order.createOrder(o).success(function (data) {
          $state.go('shuwo.order.success', {orderId: data.orderid});
          storage.removeItem('order');
          storage.removeItem('cart');
          cart.truncate();
        }).error(function () {
          alert('提交订单出错，请重试或者联系客服解决');
        });
      };

    }]);
