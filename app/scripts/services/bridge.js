'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.bridge
 * @description
 * # bridge
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('bridge', function bridge() {
    // controller 之间传值使用
    var object = {type: undefined, value: undefined};
    var address;
    return {
      setObject: function (type, value) {
        object.type = type;
        object.value = value;
      },
      getObject: function () {
        return object;
      },
      setAddress: function (a) {
        address = a;
      },
      getAddress: function () {
        return address;
      }
    }
  });
