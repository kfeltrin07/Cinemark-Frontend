const { Builder, By, Key, until, Actions, WebElement } = require("selenium-webdriver");

const assert = require('assert');

describe('SortByStranicaComponent', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => await driver.quit());

  it('should sort movies by action genre', async function(){

    this.timeout(10000);

    driver.get('https://cinemark.serengetitech.com');
    await driver.sleep(2000);

    await driver.findElement(By.xpath("//a[contains(text(),'Sort By')]")).click();

    var dropdown = await driver.findElement(By.xpath("//div[2]/button"));

    await driver.actions().move({origin: dropdown}).perform();

    var genre = await driver.findElement(By.xpath("//div[2]/div/ul[1]/li/a"));

    await driver.actions().move({origin: genre}).click().perform();
    
    //assert check 

  });


  it('should open first movie', async function (){
    
    this.timeout(10000);

    driver.get('https://cinemark.serengetitech.com');
    await driver.sleep(2000);

    await driver.findElement(By.xpath("//a[contains(text(),'Sort By')]")).click();

    await driver.findElement(By.xpath("//div[5]/div/div/div/div/span")).click();

    await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl === 'https://cinemark.serengetitech.com/film';
      }, 5000);
    
      const currentUrl = await driver.getCurrentUrl();
      assert.strictEqual(currentUrl, 'https://cinemark.serengetitech.com/film');

  });

 });
