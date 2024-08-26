class AccountCreationPage {
    constructor(page) {
      this.page = page;
      this.accountInfoText = page.locator('h2:has-text("Enter Account Information")');
      this.titleMr = page.locator('#id_gender1');
      this.titleMrs = page.locator('#id_gender2');
      this.passwordInput = page.locator('#password');
      this.daysSelect = page.locator('#days');
      this.monthsSelect = page.locator('#months');
      this.yearsSelect = page.locator('#years');
      this.newsletterCheckbox = page.locator('#newsletter');
      this.specialOffersCheckbox = page.locator('#optin');
      this.firstNameInput = page.locator('#first_name');
      this.lastNameInput = page.locator('#last_name');
      this.companyInput = page.locator('#company');
      this.address1Input = page.locator('#address1');
      this.address2Input = page.locator('#address2');
      this.countrySelect = page.locator('#country');
      this.stateInput = page.locator('#state');
      this.cityInput = page.locator('#city');
      this.zipcodeInput = page.locator('#zipcode');
      this.mobileNumberInput = page.locator('#mobile_number');
      this.createAccountButton = page.locator('button[data-qa="create-account"]');
      this.accountCreatedText = page.locator('h2:has-text("Account Created!")');
      this.continueButton = page.locator('a[data-qa="continue-button"]');
    }
  
    async isAccountInfoVisible() {
      return await this.accountInfoText.isVisible();
    }
  
    async fillAccountDetails(userDetails) {
      await this.titleMr.check();
      await this.passwordInput.fill(userDetails.password);
      await this.daysSelect.selectOption(userDetails.day);
      await this.monthsSelect.selectOption(userDetails.month);
      await this.yearsSelect.selectOption(userDetails.year);
      await this.newsletterCheckbox.check();
      await this.specialOffersCheckbox.check();
      await this.firstNameInput.fill(userDetails.firstName);
      await this.lastNameInput.fill(userDetails.lastName);
      await this.companyInput.fill(userDetails.company);
      await this.address1Input.fill(userDetails.address1);
      await this.address2Input.fill(userDetails.address2);
      await this.countrySelect.selectOption(userDetails.country);
      await this.stateInput.fill(userDetails.state);
      await this.cityInput.fill(userDetails.city);
      await this.zipcodeInput.fill(userDetails.zipcode);
      await this.mobileNumberInput.fill(userDetails.mobileNumber);
    }
  
    async clickCreateAccount() {
      await this.createAccountButton.click();
    }
  
    async isAccountCreatedVisible() {
      return await this.accountCreatedText.isVisible();
    }
  
    async clickContinue() {
      await this.continueButton.click();
    }
  }
  
  module.exports = AccountCreationPage;