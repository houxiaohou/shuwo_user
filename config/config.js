'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    urlPrefix: '@@urlPrefix',
    templateBase: '@@templateBase',
    imagePath: '@@imagePath'
  });
