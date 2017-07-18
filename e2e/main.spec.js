'use strict';

describe('WebStarter', function() {
  const ROOT_URL = 'http://127.0.0.1:9000/';
  const LOGIN_PATH = 'login';
  const USERNAME = 'admin@admin.com';
  const PASSWORD = 'admin';
  const thingList = element.all(by.repeater('thing in awesomeThings'));

  beforeEach(function() {
    browser.get(`${ROOT_URL}${LOGIN_PATH}`);

    const usernameInput = element(by.model('user.email'));
    const passwdIntput = element(by.model('user.password'));
    const loginBtn = element(by.css('.btn-login'));

    usernameInput.sendKeys(USERNAME);
    passwdIntput.sendKeys(PASSWORD);

    loginBtn.click().then(() => {
      expect(browser.getCurrentUrl()).toEqual(ROOT_URL);
    });
  });

  afterEach(function() {
    const logoutBtn = element(by.css('.btn-logout'));

    logoutBtn.click().then(() => {
      expect(browser.getCurrentUrl()).toEqual(`${ROOT_URL}${LOGIN_PATH}`);
    });
  });


  it('should have initial items', function() {
    browser.get(ROOT_URL);
    expect(thingList.count()).toEqual(6);
  });

});
