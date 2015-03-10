'use strict';

describe('Service: cache', function () {

  // load the service's module
  beforeEach(module('shuwoApp'));

  // instantiate service
  var cache;
  beforeEach(inject(function (_cache_) {
    cache = _cache_;
  }));

  it('should do something', function () {
    expect(!!cache).toBe(true);
  });

});
