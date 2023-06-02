const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require('assert');

describe('SearchStranicaComponent', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => await driver.quit());

  it('should reroute to the search page and have no movies', async function () {
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

  it('should reroute on search page', async function () {
   
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
  
  it('should find the movie list', async function () {
    this.timeout(10000);

    await driver.wait(until.urlIs('https://cinemark.serengetitech.com/search'), 5000);

    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'https://cinemark.serengetitech.com/search', 'Incorrect URL');
    
    await driver.sleep(2000);

    const filmListContainer = await driver.wait(until.elementLocated(By.className('film-list')), 5000);
    await driver.wait(until.elementIsVisible(filmListContainer), 5000);

    const isContainerDisplayed = await filmListContainer.isDisplayed();
    assert.strictEqual(isContainerDisplayed, true, 'Film list form is not displayed.');
  });

  it('should navigate to the second page of pagination', async function () {
    this.timeout(10000);
  
    const filmListContainerFirstPage = await driver.wait(until.elementLocated(By.className('film-list')), 5000);
    await driver.wait(until.elementIsVisible(filmListContainerFirstPage), 5000);
  
    const secondPageButton = await driver.findElement(By.xpath("//pagination-controls/pagination-template//li/a/span[text()='2']"));
  
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await driver.sleep(1000);
  
    await secondPageButton.click();
  
    const filmListContainerSecondPage = await driver.wait(until.elementLocated(By.className('film-list')), 5000);
    await driver.wait(until.elementIsVisible(filmListContainerSecondPage), 5000);
    
    const currentPageElement = await driver.findElement(By.xpath("//li[@class='current']/span[@aria-live='polite']/span[not(@class='show-for-sr')]"));
    const currentPage = await currentPageElement.getText();
    assert.strictEqual(currentPage, '2');
  });
  
});