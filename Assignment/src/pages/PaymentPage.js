class PaymentPage {
    constructor(page) {
      this.page = page;
      this.nameOnCardInput = page.locator('input[name="name_on_card"]');
      this.cardNumberInput = page.locator('input[name="card_number"]');
      this.cvcInput = page.locator('input[name="cvc"]');
      this.expiryMonthInput = page.locator('input[name="expiry_month"]');
      this.expiryYearInput = page.locator('input[name="expiry_year"]');
      this.payAndConfirmOrderButton = page.locator('#submit');
      this.successMessage = page.locator('#success_message');
      this.downloadInvoiceButton = page.locator('.btn-default[href="/download_invoice/"]');
      this.continueButton = page.locator('[data-qa="continue-button"]');
    }
  
    async enterPaymentDetails(name, cardNumber, cvc, expiryMonth, expiryYear) {
      await this.nameOnCardInput.fill(name);
      await this.cardNumberInput.fill(cardNumber);
      await this.cvcInput.fill(cvc);
      await this.expiryMonthInput.fill(expiryMonth);
      await this.expiryYearInput.fill(expiryYear);
    }
  
    async payAndConfirmOrder() {
      await this.payAndConfirmOrderButton.click();
    }
  
    async isSuccessMessageVisible() {
      return await this.successMessage.isVisible();
    }
  
    async downloadInvoice() {
      const downloadPromise = this.page.waitForEvent('download');
      await this.downloadInvoiceButton.click();
      return await downloadPromise;
    }
  
    async clickContinue() {
      await this.continueButton.click();
    }
  }
  
  module.exports = PaymentPage;