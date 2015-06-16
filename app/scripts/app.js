'use strict';

/**
 * @ngdoc overview
 * @name shuwoApp
 * @description
 * # shuwoApp
 *
 * Main module of the application.
 */
angular
  .module('shuwoApp', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ui.router',
    'mgcrea.ngStrap.collapse',
    'LocalStorageModule',
    'infinite-scroll',
    'services.config',
    'angular-flexslider'
  ])
  .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 'localStorageServiceProvider', 'configuration',
    function ($urlRouterProvider, $stateProvider, $httpProvider, localStorageServiceProvider, configuration) {
      localStorageServiceProvider.setPrefix('sw');
      var interceptor = ['$rootScope', '$q', '$injector', function (scope, $q, $injector) {
        function success(response) {
          return response;
        }

        function error(response) {
          var status = response.status;
          if (status == 401) {
            alert('用户身份不正确，请重新进入');
            return;
          }
          return $q.reject(response);
        }

        return function (promise) {
          return promise.then(success, error);
        }
      }];
      $httpProvider.responseInterceptors.push(interceptor);
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
          return data;
        }
        return $.param(data);
      };
      $urlRouterProvider.otherwise('/');
      var templateBase = configuration.templateBase;
      $stateProvider
        .state('shuwo', {
          abstract: true,
          url: '',
          templateUrl: templateBase + 'views/base.html'
        })
        .state('shuwo.default', {
          url: '/',
          templateUrl: templateBase + 'views/default.html',
          controller: 'DefaultCtrl'
        })
        .state('shuwo.shop', {
          abstract: true,
          url: '/shop',
          template: '<ui-view />'
        })
        .state('shuwo.shop.detail', {
          url: '/{shopId:[0-9]{1,10}}',
          templateUrl: templateBase + 'views/shop.detail.html',
          controller: 'ShopCtrl'
        })
        .state('shuwo.order', {
          abstract: true,
          url: '/order',
          template: '<ui-view />'
        })
        .state('shuwo.order.list', {
          url: '',
          templateUrl: templateBase + 'views/order.list.html',
          controller: 'OrderCtrl'
        })
        .state('shuwo.order.detail', {
          url: '/{orderId:[0-9]{1,10}}',
          templateUrl: templateBase + 'views/order.detail.html',
          controller: 'OrderDetailCtrl'
        })
        .state('shuwo.order.success', {
          url: '/{orderId:[0-9]{1,20}}/success',
          templateUrl: templateBase + 'views/order.success.html',
          controller: 'OrderSuccessCtrl'
        })
        .state('shuwo.location', {
          url: '/location',
          templateUrl: templateBase + 'views/location.html',
          controller: 'LocationCtrl'
        })
        .state('shuwo.cart', {
          url: '/cart',
          templateUrl: templateBase + 'views/cart.html',
          controller: 'CartCtrl'
        })
        .state('shuwo.checkout', {
          url: '/checkout',
          templateUrl: templateBase + 'views/checkout.html',
          controller: 'CheckoutCtrl'
        })
        .state('shuwo.address', {
          abstract: true,
          url: '/address',
          template: '<ui-view />'
        })
        .state('shuwo.address.list', {
          url: '',
          templateUrl: templateBase + 'views/address.list.html',
          controller: 'AddressCtrl'
        })
        .state('shuwo.address.add', {
          url: '/add',
          templateUrl: templateBase + 'views/address.add.html',
          controller: 'AddressAddCtrl'
        })
        .state('shuwo.address.edit', {
          url: '/edit/{id:[0-9]{1,10}}',
          templateUrl: templateBase + 'views/address.edit.html',
          controller: 'AddressEditCtrl'
        })
        .state('shuwo.bag', {
          abstract: true,
          url: '/bag',
          template: '<ui-view />'
        })
        .state('shuwo.bag.list', {
          url: '',
          templateUrl: templateBase + 'views/bag.list.html',
          controller: 'BagListCtrl'
        })
        .state('shuwo.allnotice', {
          abstract: true,
          url: '/allnotice',
          template: '<ui-view />'
        })
        .state('shuwo.allnotice.main', {
          url: '',
          templateUrl: templateBase + 'views/allnotice.main.html',
          controller: 'AllNoticeCtrl'
        })
      ;
    }])
  .run(['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    var token = $cookies.utoken;
    $http.defaults.headers.common['Authorization'] = token;
    FastClick.attach(document.body);

    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.currentState = to.name;
    });

  }]);
