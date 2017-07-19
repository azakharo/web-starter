'use strict';

describe('WebStarter', function() {
  const ROOT_URL = 'http://127.0.0.1:9000/';
  const LOGIN_PATH = 'login';
  const USERNAME = 'admin@admin.com';
  const PASSWORD = 'admin';
  const thingList = element.all(by.repeater('thing in awesomeThings'));
  const INITIAL_ITEM_COUNT = 6;
  const itemLinks = element.all(by.css('.item-link'));
  const NEW_ITEM = '1234';

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

  function getItemLink(item) {
    return itemLinks.filter(function(elem) {
      return elem.getText().then((text) => {
        return text.includes(item);
      });
    }).then((foundLinks) => {
      return foundLinks.length === 1 ? foundLinks[0] : null;
    });
  }

  function removeItem(item) {
    getItemLink(item).then((itemLink) => {
      expect(itemLink).not.toBe(null);

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
    expect(getItemLink(NEW_ITEM)).toBe(null);
    addItem(NEW_ITEM);
    expect(thingList.count()).toEqual(INITIAL_ITEM_COUNT + 1);
    expect(getItemLink(NEW_ITEM)).not.toBe(null);

    logout();
  });

  it('should rem added item', function() {
    login();

    expect(thingList.count()).toEqual(INITIAL_ITEM_COUNT + 1);
    expect(getItemLink(NEW_ITEM)).not.toBe(null);
    removeItem(NEW_ITEM);
    expect(thingList.count()).toEqual(INITIAL_ITEM_COUNT);
    expect(getItemLink(NEW_ITEM)).toBe(null);

    logout();
  });

});
