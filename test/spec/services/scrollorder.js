'use strict';

describe('Service: scrollorder', function () {

  // load the service's module
  beforeEach(module('shuwoApp'));

  // instantiate service
  var scrollorder;
  beforeEach(inject(function (_scrollorder_) {
    scrollorder = _scrollorder_;
  }));

  it('should do something', function () {
    expect(!!scrollorder).toBe(true);
  });

});
