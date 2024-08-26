class HomePage {
    constructor(page) {
      this.page = page;
      this.signupLoginButton = page.locator('a[href="/login"]');
      this.loggedInUsername = page.locator('a:has-text("Logged in as")');
      this.deleteAccountButton = page.locator('a[href="/delete_account"]');

      this.productsButton = page.locator('a[href="/products"]');

      this.logo = page.locator('.logo');
      this.subscriptionText = page.locator('h2:has-text("Subscription")');
      this.scrollUpArrow = page.locator('#scrollUp');
      this.fullFledgedText = page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")');
    }
  
    async navigate() {
      await this.page.goto('https://automationexercise.com/');
    }
  
    async isHomePageVisible() {
      return await this.page.locator('.logo').isVisible();
    }
  
    async clickSignupLogin() {
      await this.signupLoginButton.click();
    }
  
    async getLoggedInUsername() {
      return await this.loggedInUsername.textContent();
    }
  
    async clickDeleteAccount() {
      await this.deleteAccountButton.click();
    }

    async clickProducts() {
        await this.productsButton.click();
      }

      async navigate() {
        await this.page.goto('https://automationexercise.com/');
      }
    
      async isHomePageVisible() {
        return await this.logo.isVisible();
      }
    
      async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      }
    
      async isSubscriptionVisible() {
        return await this.subscriptionText.isVisible();
      }
    
      async clickScrollUpArrow() {
        await this.scrollUpArrow.click();
      }
    
      async isFullFledgedTextVisible() {
        return await this.fullFledgedText.isVisible();
      }
    
      async getFullFledgedTextPosition() {
        return await this.fullFledgedText.boundingBox();
      }
  }
  
  module.exports = HomePage;