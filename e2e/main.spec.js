'use strict';

describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://127.0.0.1:9000/');
    
    expect(browser.getTitle()).toEqual('');
  });
});
