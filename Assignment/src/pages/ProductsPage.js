class ProductsPage {
    constructor(page) {
      this.page = page;
      this.allProductsTitle = page.locator('.title text=All Products');
      this.searchInput = page.locator('#search_product');
      this.searchButton = page.locator('#submit_search');
      this.searchedProductsTitle = page.locator('.title text=Searched Products');
      this.productItems = page.locator('.product-item');

     
      this.addToCartButtons = page.locator('.add-to-cart');
      this.continueShoppingButton = page.locator('.btn-success');
      this.viewCartButton = page.locator('a[href="/view_cart"]');
    }
  
    async isAllProductsPageVisible() {
      return await this.allProductsTitle.isVisible();
    }
  
    async searchProduct(productName) {
      await this.searchInput.fill(productName);
      await this.searchButton.click();
    }
  
    async isSearchedProductsTitleVisible() {
      return await this.searchedProductsTitle.isVisible();
    }
  
    async getSearchedProductsCount() {
      return await this.productItems.count();
    }
  
    async areAllSearchedProductsVisible(productName) {
      const productCount = await this.getSearchedProductsCount();
      for (let i = 0; i < productCount; i++) {
        const productTitle = await this.productItems.nth(i).locator('.product-name').textContent();
        if (!productTitle.toLowerCase().includes(productName.toLowerCase())) {
          return false;
        }
      }
      return true;
    }

    async hoverOverProduct(index) {
        await this.productItems.nth(index).hover();
      }
    
      async addProductToCart(index) {
        await this.addToCartButtons.nth(index).click();
      }
    
      async clickContinueShopping() {
        await this.continueShoppingButton.click();
      }
    
      async clickViewCart() {
        await this.viewCartButton.click();
      }

      async addProductToCart(index) {
        await this.productItems.nth(index).hover();
        await this.addToCartButtons.nth(index).click();
      }
    
      async proceedToCheckout() {
        await this.page.locator('.btn-default[href="/checkout"]').click();
      }
  }
  
  module.exports = ProductsPage;