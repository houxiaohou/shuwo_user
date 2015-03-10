'use strict';

describe('Filter: weight', function () {

  // load the filter's module
  beforeEach(module('shuwoApp'));

  // initialize a new instance of the filter before each test
  var weight;
  beforeEach(inject(function ($filter) {
    weight = $filter('weight');
  }));

  it('should return the input prefixed with "weight filter:"', function () {
    var text = 'angularjs';
    expect(weight(text)).toBe('weight filter: ' + text);
  });

});
