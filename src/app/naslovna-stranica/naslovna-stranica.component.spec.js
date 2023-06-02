const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require('assert');

describe('NaslovnaStranicaComponent', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => await driver.quit());

  it('should reroute on searh page', async function () {

    driver.get('https://cinemark.serengetitech.com');
    this.timeout(5000);

    await driver.findElement(By.name('q')).sendKeys('mat');
    await driver.findElement(By.xpath("//button[text()='SEARCH']")).click();

    await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl === 'https://cinemark.serengetitech.com/search';
      }, 5000);
    
      const currentUrl = await driver.getCurrentUrl();
      assert.strictEqual(currentUrl, 'https://cinemark.serengetitech.com/search');

  });

  it('should reroute to the search page and be empty', async function () {
    this.timeout(5000);
  
    await driver.get('https://cinemark.serengetitech.com');
  
    const searchInput = await driver.findElement(By.name('q'));
    await searchInput.sendKeys('.');
    const searchButton = await driver.findElement(By.xpath("//button[text()='SEARCH']"));
    await searchButton.click();
  
    await driver.wait(until.urlIs('https://cinemark.serengetitech.com/search'), 5000);
  
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'https://cinemark.serengetitech.com/search');
  
    try {
      const filmListContainer = await driver.findElement(By.className('film-list'));
      assert.fail('Film list container should not exist.');
    } catch (error) {
      assert.strictEqual(error.name, 'NoSuchElementError', 'Film list container should not exist.');
    }
  });
  
  it('should reroute to the search page and find the movie list', async function () {
    this.timeout(10000);

    await driver.get('https://cinemark.serengetitech.com');

    const searchInput = await driver.findElement(By.name('q'));
    await searchInput.sendKeys('mat');
    const searchButton = await driver.findElement(By.xpath("//button[text()='SEARCH']"));
    await searchButton.click();

    await driver.sleep(5000);

    await driver.wait(until.urlIs('https://cinemark.serengetitech.com/search'), 5000);

    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'https://cinemark.serengetitech.com/search', 'Incorrect URL');
    
    await driver.sleep(1000);

    const filmListContainer = await driver.wait(until.elementLocated(By.className('film-list')), 5000);
    await driver.wait(until.elementIsVisible(filmListContainer), 5000);

    const isContainerDisplayed = await filmListContainer.isDisplayed();
    assert.strictEqual(isContainerDisplayed, true, 'Film list form is not displayed.');
  });

});