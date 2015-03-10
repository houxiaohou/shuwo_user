'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.address
 * @description
 * # address
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('address', ['$http', 'constants', function address($http, constants) {
    return {
      listUserAddress: function () {
        return $http.get(constants.API.address);
      },
      getAddressById: function (id) {
        return $http.get(constants.API.address + '/' + id);
      },
      updateAddress: function (data) {
        return $http.post(constants.API.address + '/' + data.said, data);
      },
      addAddress: function(data) {
        return $http.post(constants.API.address, data);
      },
      deleteAddress: function (id) {
        return $http.delete(constants.API.address + '/' + id);
      },
      setAddressDefault: function(id) {
        return $http.post(constants.API.address + '/' + id + '/default');
      },
      getDefaultAddress: function() {
        return $http.get(constants.API.address + '/default');
      }
    }
  }]);
