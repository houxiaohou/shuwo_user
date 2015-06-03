'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('ShopCtrl', ['$scope', 'page', '$stateParams', 'cart', 'shop', 'product', 'bridge','configuration',
    function ($scope, page, $stateParams, cart, shop, product, bridge,configuration) {
      page.hideFooter();
      page.setFooterNav('shop');

      $scope.discountimg = configuration.imagePath + 'quan.png';

      var shopId = $stateParams.shopId;
      // 先从bridge重获取shop
      var object = bridge.getObject();
      if (object.type == 'shop' && object.value.shopid == shopId) {
        // 直接从bridge拿对象
        $scope.shop = object.value;
      } else {
        // 从网络获取
        // 获取店铺信息
        shop.getShopById(shopId).success(function (data) {
          $scope.shop = data;
        });
      }

      $scope.loading = true;

      if (cart.cartObj().items.length == 0) {
        cart.cartHistory();
      }
      $scope.cart = cart;
      // 获取产品信息
      product.listProductsByShop(shopId).success(function (data) {
        $scope.products = data;
        $scope.loading = false;
      });

      // 购物车功能
      $scope.productCart = function (product) {
        // 从购物车添加或移除商品

      if( $scope.shop.isopen == "1" ){
        if (cart.isInCart(product)) {
          cart.removeItem(product);
        } else {
          cart.addItem(product);
        }} else{
        return;
      }
      };
    }]);
