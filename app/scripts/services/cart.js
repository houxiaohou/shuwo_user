'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.cart
 * @description
 * # cart
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('cart', ['storage', 'cache', function cart(storage, cache) {
    // 购物车service
    var KEY = 'cart';

    var cartObj = {
      shopId: -1,
      items: []
    };

    function syncCart() {
      // 同步产品到购物车
      storage.setItem(KEY, angular.toJson(cartObj));
    }

    return {
      truncate: function () {
        // 清空购物车
        // 设置为空
        cartObj = {
          shopId: -1,
          items: []
        };
        // 从localStorage删除
        storage.removeItem(KEY);
      },
      items: function () {
        // 所有条目
        return cartObj.items;
      },
      cartObj: function () {
        return cartObj;
      },
      addItem: function (p) {
        // 添加产品到购物车
        var shopId = p.shopid;
        var productId = p.productid;
        if (cartObj.shopId != -1 && cartObj.shopId != shopId) {
          // 购物车已经有其他店铺产品，先清空购物车
          cartObj = {
            shopId: -1,
            items: []
          };
          storage.removeItem(KEY);
        }
        cartObj.shopId = shopId;
        var filteredItems = _.where(cartObj.items, {productId: productId});
        if (filteredItems.length === 0) {
          cartObj.shopId = shopId;
          cartObj.items.push({
            productId: productId,
            num: 1
          });
        }
        cache.putProduct(p);
        syncCart();
      },
      removeItem: function (p) {
        // 从购物车移除产品
        var productId = p.productid;
        var filteredItems = _.where(cartObj.items, {productId: productId});
        if (filteredItems.length > 0) {
          var index = cartObj.items.indexOf(filteredItems[0]);
          if (index > -1) {
            cartObj.items.splice(index, 1);
          }
        }
        syncCart();
      },
      isInCart: function (p) {
        // 产品是否在购物车中
        var filteredItems = _.where(cartObj.items, {productId: p.productid});
        return filteredItems.length !== 0;
      },
      cartHistory: function () {
        // 从localStorage获取购物车记录
        var history = storage.getItem(KEY);
        if (history) {
          cartObj = angular.fromJson(history);
        }
        return cartObj;
      },
      syncCart: function() {
        syncCart();
      }
    };
  }]);
