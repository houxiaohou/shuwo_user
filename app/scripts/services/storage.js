'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.storage
 * @description
 * # storage
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('storage', ['$cookies', 'localStorageService', function storage($cookies, localStorageService) {
    // 将本地存储与cookie封装成存储工具
    var storageSupported = localStorageService.isSupported;
    return {
      setItem: function (key, value) {
        if (storageSupported) {
          // 如果支持本地存储，有限存储在本地存储中
          localStorageService.set(key, value);
          return;
        }
        $cookies[key] = value;
      },
      getItem: function (key) {
        if (storageSupported) {
          return localStorageService.get(key);
        }
        return $cookies[key];
      },
      removeItem: function (key) {
        localStorageService.remove(key);
      }
    }
  }]);
