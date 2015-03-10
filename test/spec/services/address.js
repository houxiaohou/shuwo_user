'use strict';

describe('Service: address', function () {

  // load the service's module
  beforeEach(module('shuwoApp'));

  // instantiate service
  var address;
  beforeEach(inject(function (_address_) {
    address = _address_;
  }));

  it('should do something', function () {
    expect(!!address).toBe(true);
  });

});
