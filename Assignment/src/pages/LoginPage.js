class LoginPage {
    constructor(page) {
      this.page = page;
      this.newUserSignupText = page.locator('h2:has-text("New User Signup!")');
      this.nameInput = page.locator('input[data-qa="signup-name"]');
      this.emailInput = page.locator('input[data-qa="signup-email"]');
      this.signupButton = page.locator('button[data-qa="signup-button"]');
    }
  
    async isNewUserSignupVisible() {
      return await this.newUserSignupText.isVisible();
    }
  
    async signup(name, email) {
      await this.nameInput.fill(name);
      await this.emailInput.fill(email);
      await this.signupButton.click();
    }
  }
  
  module.exports = LoginPage;