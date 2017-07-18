'use strict';

describe('WebStarter', function() {
  const thingList = element.all(by.repeater('thing in awesomeThings'));

  it('should have initial items', function() {
    browser.get('http://127.0.0.1:9000/');
    expect(thingList.count()).toEqual(6);
  });

});
