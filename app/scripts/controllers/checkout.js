'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('CheckoutCtrl', ['$scope', '$state', 'address', 'bridge', 'storage', 'page', 'order', 'cart', 'shop', 'geolocation', 'bag',
    function ($scope, $state, address, bridge, storage, page, order, cart, shop, geolocation, bag) {
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

      $scope.notes = "";

      $scope.addressLoading = true;
      $scope.submitting = false;
      $scope.ispickup = 0;
      $scope.bags = [];
      $scope.selectedBag = undefined;
      $scope.o = -1;
      $scope.type = 1;

      $scope.lat = 0;
      $scope.lng = 0;

      $scope.onlyDelivery = 0;

      $scope.shopids = [15];

      $scope.choseDelivery = function (i) {
        $scope.ispickup = i;
      };
      $scope.clean = function () {
        $scope.notes = "";
      };

      // 获取订单产品
      var orderObject = storage.getItem('order');
      if (!orderObject) {
        // 显示没有产品
        $state.go('shuwo.cart');
      } else {
        var obj = angular.fromJson(orderObject);
        $scope.shopid = obj.shopid;

        $scope.onlyDelivery = 1;
        $scope.ispickup = 0;

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

      $scope.choseBag = function (b) {
        // 选择优惠券
        if (!$scope.selectedBag || $scope.selectedBag.id != b.id) {
          $scope.selectedBag = b;
        } else {
          $scope.selectedBag = undefined;
        }
        $scope.o = -1;
      };

      $scope.listUserBags = function () {
        $scope.selectedBag = undefined;
        bag.listUserAvailableBags($scope.type).success(function (data) {
          $scope.bags = data;
          if ($scope.bags.length > 0) {
            if ($scope.onlyDelivery == 0) {
              $scope.selectedBag = $scope.bags[0];
            }
          }
        });
      };

      $scope.listUserBags();

      $scope.$watch('ispickup', function (newVal, oldVal) {
        if (newVal != oldVal) {
          if (newVal == 1) {
            $scope.type = 2;
          } else {
            $scope.type = 1;
          }
          $scope.listUserBags();
        }
      });
      $scope.$watch('agree', function (agree) {
        if (agree == false) {
            $scope.notes = "";
        }
      });
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

      $scope.submit = function () {
        // 提交订单
        if ($scope.ispickup == 1) {
          if (!confirm('您选择的是 “店内自提”，订单无法送货上门，点击确定提交订单，点击 “取消” 继续编辑下单信息')) {
            return;
          }
        }

        if (($scope.lat == 0 || $scope.lng == 0) && $scope.ispickup == 0) {
          // 未允许获取位置并且选择的外送
          if (!confirm('由于您没有允许定位，树窝无法获取您的位置，请确认您的订单是外送订单，点击确定提交订单，点击 “取消” 编辑下单信息')) {
            return;
          }
        }

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
        if ($scope.selectedBag) {
          o.bag_id = $scope.selectedBag.id;
        } else {
          o.bag_id = 0;
        }
        order.createOrder(o).success(function (data) {
          if ('error' in data) {
            if (data.error == 'blocked') {
              alert('涉嫌刷单已被禁止下单，如有疑问请联系客服');
              return;
            }
            if (data.error == 'bag_unavailable') {
              alert('您选择的红包不可用');
              return;
            }
          }
          $state.go('shuwo.order.success', {orderId: data.orderid});
          storage.removeItem('order');
          storage.removeItem('cart');
          cart.truncate();
        }).error(function () {
          alert('提交订单出错，请重试或者联系客服解决');
        });
      };

    }]);
