'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    urlPrefix: '/Api',
    templateBase: '/static/user/',
    imagePath: '/static/user/images/'
  });
