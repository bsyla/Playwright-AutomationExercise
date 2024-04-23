import { test, type Page } from "@playwright/test";
import BasePage from "../pageObjects/basePage";
import HomePage from "../pageObjects/homePage";
import CartPage from "../pageObjects/cartPage";
import CheckOut from "../pageObjects/checkOut";

test("Add item to cart and checkout", async ({ page }) => {
  const basePage = new BasePage(page);
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const checkOut = new CheckOut(page);

  await basePage.navigateToPage("/");
  const storedPriceForItem = await homePage.storeProductInfo();
  await basePage.clickButton(homePage.addToCartBtn);
  await basePage.clickButton(homePage.viewCart);
  await basePage.assertPageUrl("/view_cart");
  await cartPage.verifyCartDetailsUI("Rs. 500", "Blue Top");

  await cartPage.verifyCartPriceLogically(storedPriceForItem);

  await basePage.clickButton(cartPage.checkOutBTN);

  await basePage.assertPageUrl("/checkout");
  await basePage.blockAds();

  await basePage.clickButton(cartPage.checkOutBTN);
  await checkOut.validateTitle();

  await checkOut.fillInCreditCardForm();

  await basePage.clickButton(checkOut.clickPayBTN);

  await cartPage.validateOrderPlaced();
});
