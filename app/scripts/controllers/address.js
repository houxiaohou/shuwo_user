'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:AddressCtrl
 * @description
 * # AddressCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('AddressCtrl', ['$scope', '$state', '$timeout', 'address', 'bridge', function ($scope, $state, $timeout, address, bridge) {
    // 地址列表
    $scope.loading = true;
    $scope.addressList = [];

    // 获取用户地址列表
    address.listUserAddress().success(function (data) {
      $scope.addressList = data;
      $scope.loading = false;
    }).error(function () {
      $scope.loading = false;
    });

    // 删除地址
    $scope.removeAddress = function (a) {
      if (confirm('确认删除地址吗？')) {
        address.deleteAddress(a.said).success(function () {
          var index = $scope.addressList.indexOf(a);
          $scope.addressList.splice(index, 1);
        });
      }
    };

    // 设置送货地址
    $scope.setDefault = function (a) {
      for (var i in $scope.addressList) {
        var item = $scope.addressList[i];
        item.isdefault = '0';
      }
      a.isdefault = '1';
      address.setAddressDefault(a.said);
      bridge.setAddress(a);
      $timeout(function () {
        $state.go('shuwo.checkout');
      }, 100);
    };

  }]);
angular.module('shuwoApp')
  .controller('AddressAddCtrl', ['$rootScope', '$scope', '$state', 'address', function ($rootScope, $scope, $state, address) {
    // 新增地址
    $scope.address = {
      province: '上海',
      city: '上海市区',
      district: '上海'
    };

    $scope.pattern = (function () {
      return {
        test: function (value) {
          return /^1(3|4|5|7|8)\d{9}$/.test(value);
        }
      }
    })();

    $scope.addressPattern = (function() {
      return {
        test: function(value) {
          return value.length >= 5;
        }
      }
    })();

    var saving = false;

    $scope.saveAddress = function () {
      if (saving) {
        return;
      }
      saving = true;
      address.addAddress($scope.address).success(function () {
        // 添加成功后跳转
        $state.go('shuwo.checkout');
      });
    };

  }]);
angular.module('shuwoApp')
  .controller('AddressEditCtrl', ['$scope', '$state', '$stateParams', 'address', function ($scope, $state, $stateParams, address) {
    // 编辑地址
    var addressId = $stateParams.id;
    $scope.loading = true;

    address.getAddressById(addressId).success(function (data) {
      $scope.address = data;
      $scope.loading = false;
    }).error(function () {
      $scope.address = {};
      $scope.loading = false;
    });

    $scope.pattern = (function () {
      return {
        test: function (value) {
          return /^1(3|4|5|7|8)\d{9}$/.test(value);
        }
      }
    })();

    $scope.saveAddress = function () {
      $scope.address.province = '上海';
      $scope.address.city = '上海市区';
      $scope.address.district = '上海';
      address.updateAddress($scope.address);
      $state.go('shuwo.address.list');
    };

  }]);
