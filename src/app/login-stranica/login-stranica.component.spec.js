const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require('assert');

describe('LoginStranicaComponent', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => await driver.quit());

  it('should display an error message for invalid credentials', async function () {
    
    driver.get('https://cinemark.serengetitech.com/login');
    
    this.timeout(5000);
    
    await driver.findElement(By.name('username')).sendKeys('username');
    await driver.findElement(By.name('password')).sendKeys('password');
  
    await driver.findElement(By.className('submit-btn')).click();
  
    const errorMessageElement = await driver.wait(
      until.elementLocated(By.className('toast-top-right toast-container')),
      5000
    );
  
    const errorMessage = await errorMessageElement.getText();
  
    assert.strictEqual(errorMessage, 'User not Found');
  });

  it('should switch to register form on button toggle', async function() {
    this.timeout(5000); 
  
    await driver.get('https://cinemark.serengetitech.com/login');
  
    await driver.findElement(By.xpath("//button[text()='Register']")).click();
  
    const form = await driver.wait(
      until.elementLocated(By.id('registerID')), 5000
    );
    
    await driver.wait(until.elementIsVisible(form), 5000);
  
    const isFormDisplayed = await form.isDisplayed();
  
    assert.strictEqual(isFormDisplayed, true);
  });

  it('should switch to login form on button toggle', async function() {
    this.timeout(5000); 
  
    await driver.get('https://cinemark.serengetitech.com/login');
  
    await driver.findElement(By.xpath("//button[text()='Log In']")).click();
  
    const form = await driver.wait(
      until.elementLocated(By.id('loginID')), 5000
    );
    
    await driver.wait(until.elementIsVisible(form), 5000);
  
    const isFormDisplayed = await form.isDisplayed();
  
    assert.strictEqual(isFormDisplayed, true);
  });
  

  it('should login successfully and redirect to home page', async function () {

    driver.get('https://cinemark.serengetitech.com/login');
    this.timeout(5000);
  
    await driver.findElement(By.name('username')).sendKeys('tom');
    await driver.findElement(By.name('password')).sendKeys('123456');

    await driver.findElement(By.className('submit-btn')).click();
  
    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl !== 'https://cinemark.serengetitech.com/login';
    }, 5000);
  
    const currentUrl = await driver.getCurrentUrl();
    assert.notStrictEqual(currentUrl, 'https://cinemark.serengetitech.com/login');
  });

});
