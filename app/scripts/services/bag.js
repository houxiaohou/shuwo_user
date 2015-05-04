'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.bag
 * @description
 * # bag
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('bag', ['$http', 'constants', function bag($http, constants) {
    return {
      listUserAvailableBags: function(type) {
        return $http.get(constants.API.bags, {params: {type: type}});
      },
      listUserUsedBags: function() {
        return $http.get(constants.API.bagsUsed);
      }
    }
  }]);
