'use strict';

/**
 * @ngdoc function
 * @name shuwoApp.controller:BagCtrl
 * @description
 * # BagCtrl
 * Controller of the shuwoApp
 */
angular.module('shuwoApp')
  .controller('BagListCtrl', ['$scope', 'page', 'bag', 'configuration', function ($scope, page, bag, configuration) {
    page.showFooter();
    page.setFooterNav('bag');

    $scope.green_5 = configuration.imagePath + 'green-5.png';
    $scope.red_5 = configuration.imagePath + 'red-5.png';
    $scope.green_10 = configuration.imagePath + 'green-10.png';
    $scope.grey_5 = configuration.imagePath + 'grey-5.png';
    $scope.grey_10 = configuration.imagePath + 'grey-10.png';
    $scope.expired_img = configuration.imagePath + 'expired.png';
    $scope.used_img = configuration.imagePath + 'used.png';
    $scope.green_2 = configuration.imagePath + 'green-2.png';

    $scope.grey_2 = configuration.imagePath + 'grey-2.png';

    $scope.loading = true;
    $scope.used = 0;
    $scope.bags = [];
    $scope.o = {open: 0};

    $scope.choseUsed = function (i) {
      $scope.used = i;
    };

    listUserAvailableBags();

    function listUserAvailableBags() {
      $scope.loading = true;
      bag.listUserAvailableBags(0).success(function (data) {
        // 列出用户的红包
        $scope.loading = false;
        $scope.bags = data;
      });
    }

    function listUserUsedBags() {
      $scope.bags = [];
      $scope.loading = true;
      bag.listUserUsedBags().success(function (data) {
        $scope.loading = false;
        $scope.bags = data;
      });
    }

    $scope.$watch('used', function (newVal, oldVal) {
      if (newVal != oldVal) {
        if (newVal == 1) {
          listUserUsedBags();
        } else {
          listUserAvailableBags();
        }
      }
    });

  }]);
