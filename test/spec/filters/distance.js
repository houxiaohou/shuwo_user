'use strict';

describe('Filter: distance', function () {

  // load the filter's module
  beforeEach(module('shuwoApp'));

  // initialize a new instance of the filter before each test
  var distance;
  beforeEach(inject(function ($filter) {
    distance = $filter('distance');
  }));

  it('should return the input prefixed with "distance filter:"', function () {
    var text = 'angularjs';
    expect(distance(text)).toBe('distance filter: ' + text);
  });

});
