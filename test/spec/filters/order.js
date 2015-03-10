'use strict';

describe('Filter: order', function () {

  // load the filter's module
  beforeEach(module('shuwoApp'));

  // initialize a new instance of the filter before each test
  var order;
  beforeEach(inject(function ($filter) {
    order = $filter('order');
  }));

  it('should return the input prefixed with "order filter:"', function () {
    var text = 'angularjs';
    expect(order(text)).toBe('order filter: ' + text);
  });

});
