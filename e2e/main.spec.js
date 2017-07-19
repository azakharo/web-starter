'use strict';

describe('WebStarter', function() {
  const ROOT_URL = 'http://127.0.0.1:9000/';
  const LOGIN_PATH = 'login';
  const USERNAME = 'admin@admin.com';
  const PASSWORD = 'admin';
  const INITIAL_ITEM_COUNT = 6;
  const thingList = element.all(by.repeater('thing in awesomeThings'));
  const itemLinks = element.all(by.css('.item-link'));

  function login() {
    browser.get(`${ROOT_URL}${LOGIN_PATH}`);

    const usernameInput = element(by.model('user.email'));
    const passwdIntput = element(by.model('user.password'));
    const loginBtn = element(by.css('.btn-login'));

    usernameInput.sendKeys(USERNAME);
    passwdIntput.sendKeys(PASSWORD);

    loginBtn.click().then(() => {
      expect(browser.getCurrentUrl()).toEqual(ROOT_URL);
    });
  }

  function logout() {
    const logoutBtn = element(by.css('.btn-logout'));

    logoutBtn.click().then(() => {
      expect(browser.getCurrentUrl()).toEqual(`${ROOT_URL}${LOGIN_PATH}`);
    });
  }

  function addItem(item) {
    const itemInput = element(by.model('newThing'));
    const addNewBtn = element(by.css('.btn-add-new'));

    itemInput.sendKeys(item);
    addNewBtn.click();
  }

  function removeItem(item) {
    itemLinks.filter(function(elem) {
      return elem.getText().then((text) => {
        return text.includes(item);
      });
    }).then((foundLinks) => {
      expect(foundLinks.length).toEqual(1);

      // Found the item's link
      const itemLink = foundLinks[0];

      // Get the item's close button
      const itemCloseBtn = itemLink.element(by.css('button.close'));
      itemCloseBtn.click();
    });

  }

  it('should have initial items', function() {
    browser.get(ROOT_URL);
    expect(thingList.count()).toEqual(INITIAL_ITEM_COUNT);
  });

  it('should add a new item', function() {
    login();

    expect(thingList.count()).toEqual(INITIAL_ITEM_COUNT);

    addItem('123');
    expect(thingList.count()).toEqual(INITIAL_ITEM_COUNT + 1);
    removeItem('123');

    expect(thingList.count()).toEqual(INITIAL_ITEM_COUNT);

    logout();
  });

});
