'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.order
 * @description
 * # order
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('order', ['$http', 'constants', function order($http, constants) {
    return {
      listUserOrders: function (start, count) {
        return $http.get(constants.API.userOrder, {
          params: {
            start: start,
            count: count,
            status: -1
          }
        });
      },
      getOrderById: function (id) {
        return $http.get(constants.API.order + '/' + id);
      },

      createOrder: function (o) {
        return $http.post(constants.API.order, o);
      }
    }
  }]);
