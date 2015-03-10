'use strict';

describe('Filter: price', function () {

  // load the filter's module
  beforeEach(module('shuwoApp'));

  // initialize a new instance of the filter before each test
  var price;
  beforeEach(inject(function ($filter) {
    price = $filter('price');
  }));

  it('should return the input prefixed with "price filter:"', function () {
    var text = 'angularjs';
    expect(price(text)).toBe('price filter: ' + text);
  });

});
