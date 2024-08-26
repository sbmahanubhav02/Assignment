class CartPage {
    constructor(page) {
      this.page = page;
      this.cartButton = page.locator('a[href="/view_cart"]');
      this.subscriptionText = page.locator('h2:has-text("Subscription")');
      this.subscriptionEmailInput = page.locator('#susbscribe_email');
      this.subscriptionButton = page.locator('#subscribe');
      this.successMessage = page.locator('.alert-success');

      this.cartProducts = page.locator('tbody tr');
    }
  
    async navigateToCart() {
      await this.cartButton.click();
    }
  
    async scrollToFooter() {
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    }
  
    async isSubscriptionVisible() {
      return await this.subscriptionText.isVisible();
    }
  
    async subscribeNewsletter(email) {
      await this.subscriptionEmailInput.fill(email);
      await this.subscriptionButton.click();
    }
  
    async isSuccessMessageVisible() {
      return await this.successMessage.isVisible();
    }
  
    async getSuccessMessageText() {
      return await this.successMessage.textContent();
    }

    async getCartProductsCount() {
        return await this.cartProducts.count();
      }
    
      async getProductDetails(index) {
        const row = this.cartProducts.nth(index);
        return {
          name: await row.locator('h4 a').textContent(),
          price: await row.locator('.cart_price p').textContent(),
          quantity: await row.locator('.cart_quantity button').textContent(),
          totalPrice: await row.locator('.cart_total .cart_total_price').textContent()
        };
      }
  }
  
  module.exports = CartPage;