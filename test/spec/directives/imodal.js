'use strict';

describe('Directive: imodal', function () {

  // load the directive's module
  beforeEach(module('shuwoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<imodal></imodal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the imodal directive');
  }));
});
