'use strict';

describe('Filter: unitnum', function () {

  // load the filter's module
  beforeEach(module('shuwoApp'));

  // initialize a new instance of the filter before each test
  var unitnum;
  beforeEach(inject(function ($filter) {
    unitnum = $filter('unitnum');
  }));

  it('should return the input prefixed with "unitnum filter:"', function () {
    var text = 'angularjs';
    expect(unitnum(text)).toBe('unitnum filter: ' + text);
  });

});
