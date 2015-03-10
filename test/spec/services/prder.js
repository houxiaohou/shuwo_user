'use strict';

describe('Service: prder', function () {

  // load the service's module
  beforeEach(module('shuwoApp'));

  // instantiate service
  var prder;
  beforeEach(inject(function (_prder_) {
    prder = _prder_;
  }));

  it('should do something', function () {
    expect(!!prder).toBe(true);
  });

});
