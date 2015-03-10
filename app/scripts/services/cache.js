'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.cache
 * @description
 * # cache
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('cache', ['$cacheFactory', function cache() {
    var CachePool = {};
    return {
      putProduct: function (product) {
        var key = 'product-' + product.productid;
        CachePool[key] = product;
      },
      removeProduct: function (productId) {
        var key = 'product-' + productId;
        delete CachePool[key];
      },
      getProduct: function (productId) {
        var key = 'product-' + productId;
        return CachePool[key];
      }
    }
  }]);
