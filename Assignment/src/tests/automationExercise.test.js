const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const AccountCreationPage = require('../pages/AccountCreationPage');
const PaymentPage = require('../pages/PaymentPage');
const CheckoutPage = require('../pages/CheckoutPage');




test.describe('Automation Exercise Test Cases', () => {
    let homePage, loginPage, productsPage, cartPage, checkoutPage, paymentPage, accountCreationPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    paymentPage = new PaymentPage(page);
    checkoutPage = new CheckoutPage(page);
    accountCreationPage = new AccountCreationPage(page);
    await homePage.navigate();
  });

  test.only('Test Case 1: Register User', async ({ page }) => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 4. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 5. Verify 'New User Signup!' is visible
    expect(await loginPage.isNewUserSignupVisible()).toBeTruthy();

    // 6. Enter name and email address
    // 7. Click 'Signup' button
    await loginPage.signup('Test User', 'testuser' + Date.now() + '@example.com');

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    expect(await accountCreationPage.isAccountInfoVisible()).toBeTruthy();

    // 9-12. Fill details
    const userDetails = {
      password: 'password123',
      day: '1',
      month: '1',
      year: '1990',
      firstName: 'Test',
      lastName: 'User',
      company: 'Test Company',
      address1: '123 Test St',
      address2: 'Apt 4',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobileNumber: '1234567890'
    };
    await accountCreationPage.fillAccountDetails(userDetails);

    // 13. Click 'Create Account button'
    await accountCreationPage.clickCreateAccount();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    expect(await accountCreationPage.isAccountCreatedVisible()).toBeTruthy();

    // 15. Click 'Continue' button
    await accountCreationPage.clickContinue();

    // 16. Verify that 'Logged in as username' is visible
    const loggedInText = await homePage.getLoggedInUsername();
    expect(loggedInText).toContain('Test User');

    // 17. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    const accountDeletedText = await page.locator('h2:has-text("Account Deleted!")').isVisible();
    expect(accountDeletedText).toBeTruthy();
    await page.locator('a[data-qa="continue-button"]').click();
  });

  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 4. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 5. Verify 'Login to your account' is visible
    expect(await loginPage.isLoginToAccountVisible()).toBeTruthy();

    // 6. Enter correct email address and password
    // 7. Click 'login' button
    await loginPage.login('testuser@example.com', 'password123');

    // 8. Verify that 'Logged in as username' is visible
    const loggedInText = await homePage.getLoggedInUsername();
    expect(loggedInText).toContain('Test User');

    // 9. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 10. Verify that 'ACCOUNT DELETED!' is visible
    const accountDeletedText = await page.locator('h2:has-text("Account Deleted!")').isVisible();
    expect(accountDeletedText).toBeTruthy();
  });


test('Test Case 9: Search Product', async ({ page }) => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 4. Click on 'Products' button
    await homePage.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    expect(await productsPage.isAllProductsPageVisible()).toBeTruthy();

    // 6. Enter product name in search input and click search button
    const searchTerm = 'Blue Top';
    await productsPage.searchProduct(searchTerm);

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    expect(await productsPage.isSearchedProductsTitleVisible()).toBeTruthy();

    // 8. Verify all the products related to search are visible
    expect(await productsPage.getSearchedProductsCount()).toBeGreaterThan(0);
    expect(await productsPage.areAllSearchedProductsVisible(searchTerm)).toBeTruthy();
  });

  test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 4. Click 'Cart' button
    await cartPage.navigateToCart();

    // 5. Scroll down to footer
    await cartPage.scrollToFooter();

    // 6. Verify text 'SUBSCRIPTION'
    expect(await cartPage.isSubscriptionVisible()).toBeTruthy();

    // 7. Enter email address in input and click arrow button
    const testEmail = 'test' + Date.now() + '@example.com';
    await cartPage.subscribeNewsletter(testEmail);

    // 8. Verify success message 'You have been successfully subscribed!' is visible
    expect(await cartPage.isSuccessMessageVisible()).toBeTruthy();
    const successMessageText = await cartPage.getSuccessMessageText();
    expect(successMessageText).toContain('You have been successfully subscribed!');
  });

  test('Test Case 12: Add Products in Cart', async ({ page }) => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 4. Click 'Products' button
    await homePage.clickProducts();

    // 5. Hover over first product and click 'Add to cart'
    await productsPage.hoverOverProduct(0);
    await productsPage.addProductToCart(0);

    // 6. Click 'Continue Shopping' button
    await productsPage.clickContinueShopping();

    // 7. Hover over second product and click 'Add to cart'
    await productsPage.hoverOverProduct(1);
    await productsPage.addProductToCart(1);

    // 8. Click 'View Cart' button
    await productsPage.clickViewCart();

    // 9. Verify both products are added to Cart
    expect(await cartPage.getCartProductsCount()).toBe(2);

    // 10. Verify their prices, quantity and total price
    const product1 = await cartPage.getProductDetails(0);
    const product2 = await cartPage.getProductDetails(1);

    expect(product1.quantity).toBe('1');
    expect(product2.quantity).toBe('1');

    // Verify that total price is correct (price * quantity)
    const verifyTotalPrice = (price, quantity, totalPrice) => {
      const calculatedTotal = parseFloat(price.replace('Rs. ', '')) * parseInt(quantity);
      const actualTotal = parseFloat(totalPrice.replace('Rs. ', ''));
      expect(calculatedTotal).toBeCloseTo(actualTotal, 2);
    };

    verifyTotalPrice(product1.price, product1.quantity, product1.totalPrice);
    verifyTotalPrice(product2.price, product2.quantity, product2.totalPrice);
  });

  test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
    // 1-3. Navigate to home page and verify it's visible
    await homePage.navigate();
    expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 4. Add products to cart
    await homePage.clickProducts();
    await productsPage.addProductToCart(0);

    // 5-6. Click 'Cart' button and verify cart page is displayed
    await cartPage.navigateToCart();
    expect(await cartPage.getCartProductsCount()).toBe(1);

    // 7. Click Proceed To Checkout
    await productsPage.proceedToCheckout();

    // 8. Click 'Register / Login' button
    await homePage.clickSignupLogin();

    // 9. Fill all details in Signup and create account
    await loginPage.signup('TestUser', 'testuser' + Date.now() + '@example.com');
    await accountCreationPage.fillAccountDetails({
      password: 'password123',
      day: '1',
      month: '1',
      year: '1990',
      firstName: 'Test',
      lastName: 'User',
      address1: '123 Test St',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobileNumber: '1234567890'
    });
    await accountCreationPage.clickCreateAccount();

    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    expect(await accountCreationPage.isAccountCreatedVisible()).toBeTruthy();
    await accountCreationPage.clickContinue();

    // 11. Verify ' Logged in as username' at top
    const loggedInText = await homePage.getLoggedInUsername();
    expect(loggedInText).toContain('TestUser');

    // 12-13. Click 'Cart' button and 'Proceed To Checkout' button
    await cartPage.navigateToCart();
    await productsPage.proceedToCheckout();

    // 14. Verify Address Details and Review Your Order
    expect(await checkoutPage.verifyAddressDetails()).toBeTruthy();
    expect(await checkoutPage.verifyOrderReview()).toBeTruthy();

    // 15. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterComment('Test order');
    await checkoutPage.placeOrder();

    // 16-17. Enter payment details and click 'Pay and Confirm Order' button
    await paymentPage.enterPaymentDetails('Test User', '4111111111111111', '123', '12', '2025');
    await paymentPage.payAndConfirmOrder();

    // 18. Verify success message
    expect(await paymentPage.isSuccessMessageVisible()).toBeTruthy();

    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully
    const download = await paymentPage.downloadInvoice();
    expect(download.suggestedFilename()).toContain('invoice');

    // 20. Click 'Continue' button
    await paymentPage.clickContinue();

    // 21. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    const accountDeletedText = await page.locator('h2:has-text("Account Deleted!")').isVisible();
    expect(accountDeletedText).toBeTruthy();
    await page.locator('a[data-qa="continue-button"]').click();
  });
  test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {
    // 1-2. Launch browser and navigate to url
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 4. Scroll down page to bottom
    await homePage.scrollToBottom();

    // 5. Verify 'SUBSCRIPTION' is visible
    expect(await homePage.isSubscriptionVisible()).toBeTruthy();

    // 6. Click on arrow at bottom right side to move upward
    await homePage.clickScrollUpArrow();

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    expect(await homePage.isFullFledgedTextVisible()).toBeTruthy();

    // Additional check: Verify that the text is in the upper part of the page
    const textPosition = await homePage.getFullFledgedTextPosition();
    expect(textPosition.y).toBeLessThan(page.viewportSize().height / 2);
  });
});