'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.constants
 * @description
 * # constants
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('constants', ['configuration', function constants(configuration) {
    var prefix = configuration.urlPrefix;
    return {
      API: {
        shops: prefix + '/shops',
        shop: prefix + '/shop',
        product: prefix + '/product',
        address: prefix + '/address',
        order: prefix + '/order',
        userOrder: prefix + '/user/orders',
        orderConfirm: prefix + '/orderconfirm'
      }
    }
  }]);
