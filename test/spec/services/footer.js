'use strict';

describe('Service: footer', function () {

  // load the service's module
  beforeEach(module('shuwoApp'));

  // instantiate service
  var footer;
  beforeEach(inject(function (_footer_) {
    footer = _footer_;
  }));

  it('should do something', function () {
    expect(!!footer).toBe(true);
  });

});
