'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('CartCtrl', ['$scope', '$state', 'page', 'cart', 'cache', 'product', 'shop', 'storage', 'configuration',
    function ($scope, $state, page, cart, cache, product, shop, storage, configuration) {
      page.hideFooter();

      $scope.shopLoading = true;
      $scope.productLoading = true;

      $scope.noneImage = configuration.imagePath + 'wan.png';

      var cartObj = cart.cartObj();
      if (cartObj.items.length == 0) {
        cartObj = cart.cartHistory();
      }
      var items = cartObj.items;
      var shopId = cartObj.shopId;

      $scope.shop = {};
      $scope.items = angular.copy(items);
      $scope.products = [];


      shop.getShopById(shopId).success(function (data) {
        $scope.shop = data;
        $scope.shopLoading = false;
      });

      $scope.$watch('products', function (newVal, oldVal) {
        if (newVal.length == $scope.items.length) {
          // 产品实例获取完毕后，绑定到购物车条目对象上，供展示使用
          for (var i in $scope.items) {
            var item = $scope.items[i];
            var product = _.where($scope.products, {productid: item.productId})[0];
            item.product = product;
          }
          // 产品加载完成后计算总价
          $scope.totalPrice = totalPrice;
          $scope.productLoading = false;
        }
      }, true);

      $scope.back = function () {
        console.log('backing...');
        if ($scope.shop.shopid) {
          $state.go('shuwo.shop.detail', {shopId: $scope.shop.shopid});
        } else {
          $state.go('shuwo.default');
        }
      };

      initialProduct();

      function initialProduct() {
        // 获取购物车中的产品实例，加入到产品数组中
        for (var i in items) {
          var item = items[i];
          var productId = item.productId;
          var productInstance = cache.getProduct(item.productId);
          if (!productInstance) {
            product.getProductById(productId).success(function (data) {
              $scope.products.push(data);
              cache.putProduct(data);
            });
          } else {
            $scope.products.push(productInstance);
          }
        }
      }

      // 添加数量
      $scope.plus = function (item) {
        item.num = item.num + 1;
      };

      // 减少数量
      $scope.minus = function (item) {
        if (item.num > 1) {
          item.num = item.num - 1;
        }
      };

      // 点击删除
      $scope.removeFromCart = function (product, index) {
        cart.removeItem(product);
        $scope.items.slice(index, 1);
      };

      // 计算总价
      function totalPrice() {
        var total = 0.00;
        for (var i in $scope.items) {
          var item = $scope.items[i];
          var p = item.product;
          total += product.calculateProductPrice(p, item.num);
        }
        return total;
      }

      // 确认下单
      $scope.submit = function () {
        // 将本次订单信息写入localStorage
        var orderItems = [];
        for (var i in $scope.items) {
          var item = $scope.items[i];
          var p = item.product;
          var price = product.calculateProductPrice(p, item.num);
          console.log(price);
          var weight = '';
          if (p.attribute == '1') {
            weight = item.num * p.unitweight;
          } else if (p.attribute == '2') {
            weight = item.num * 250;
          }
          orderItems.push({
            productId: p.productid,
            name: p.productname,
            num: item.num,
            price: price,
            weight: weight,
            unit: p.unit,
            attribute: p.attribute
          });
        }

        var obj = {shopid: $scope.shop.shopid, items: orderItems};
        // 写入localStorage
        storage.setItem('order', angular.toJson(obj));
        $state.go('shuwo.checkout');
      };

      // 更新购物车localstorage
      $scope.$watch('items', function (newVal, oldVal) {
        if (newVal != undefined) {
          cart.cartObj().items = $scope.items;
          cart.syncCart();
        }
      }, true);

    }]);
