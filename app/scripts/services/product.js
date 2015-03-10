'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.product
 * @description
 * # product
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('product', ['constants', '$http', function product(constants, $http) {
    return {
      listProductsByShop: function (shopId) {
        return $http.get(constants.API.shop + '/' + shopId + '/products');
      },
      getProductById: function (productId) {
        return $http.get(constants.API.product + '/' + productId);
      },
      calculateProductPrice: function (product, num) {
        if (product.attribute === '1') {
          return ((num * product.unitweight) / 500) * product.discount;
        }
        if (product.attribute == '2') {
          return num * 250 * product.discount / 500;
        }
        if (product.attribute == '3') {
          return num * product.discount;
        }
      }
    }
  }]);
