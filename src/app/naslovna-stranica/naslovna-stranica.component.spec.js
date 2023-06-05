const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require('assert');

describe('NaslovnaStranicaComponent', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => await driver.quit());

  it('should reroute on search page on movie search', async function () {
   
    this.timeout(10000);

    driver.get('https://cinemark.serengetitech.com');
    await driver.sleep(1000);

    await driver.findElement(By.name('q')).sendKeys('m');
    await driver.findElement(By.xpath("//button[text()='SEARCH']")).click();

    await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl === 'https://cinemark.serengetitech.com/search';
      }, 5000);
    
      const currentUrl = await driver.getCurrentUrl();
      assert.strictEqual(currentUrl, 'https://cinemark.serengetitech.com/search');

  });

  it('should rerote on sort page on sort button press', async function (){
    
    this.timeout(10000);

    driver.get('https://cinemark.serengetitech.com');
    await driver.sleep(1000);

    await driver.findElement(By.xpath("//a[contains(text(),'Sort By')]")).click() ;

    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl === 'https://cinemark.serengetitech.com/sort';
    }, 5000);
  
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'https://cinemark.serengetitech.com/sort');

  });

  it('should rerote on login page on login button press', async function (){
    
    this.timeout(10000);

    driver.get('https://cinemark.serengetitech.com');
    await driver.sleep(1000);

    await driver.findElement(By.xpath("//a[contains(text(),'Login')]")).click() ;

    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl === 'https://cinemark.serengetitech.com/login';
    }, 5000);
  
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'https://cinemark.serengetitech.com/login');

  });
  
});