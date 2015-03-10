'use strict';

describe('Service: bridge', function () {

  // load the service's module
  beforeEach(module('shuwoApp'));

  // instantiate service
  var bridge;
  beforeEach(inject(function (_bridge_) {
    bridge = _bridge_;
  }));

  it('should do something', function () {
    expect(!!bridge).toBe(true);
  });

});
