'use strict';

/**
 * @ngdoc service
 * @name shuwoApp.page
 * @description
 * # page
 * Service in the shuwoApp.
 */
angular.module('shuwoApp')
  .service('page', function page() {
    var footer = true;
    var footerNav = 'shop';
    return {
      hideFooter: function () {
        footer = false;
      },
      showFooter: function () {
        footer = true;
      },
      hasFooter: function () {
        return footer;
      },
      setFooterNav: function (newNav) {
        footerNav = newNav;
      },
      getFooterNav: function () {
        return footerNav;
      }
    }
  });
