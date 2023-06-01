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

});
