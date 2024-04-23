import { Page, Locator, expect, test } from "@playwright/test";

export default class CartPage {
  readonly page: Page;
  readonly cartPriceUI: Locator;
  readonly cartPriceBE: Locator;
  readonly itemInCartTitleUI: Locator;
  readonly itemInCartTitleBE: Locator;
  readonly checkOutBTN: Locator;
  readonly orderValidation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartPriceUI = page
      .locator("[class='cart_price']")
      .filter({ hasText: "Rs. 500" }); //filter needs to change for longevity purposes in case we will evaluate a different item
    this.cartPriceBE = page.locator("[class='cart_price']");
    this.itemInCartTitleUI = page
      .getByRole("link")
      .filter({ hasText: "Blue Top" }); //filter needs to change for longevity purposes in case we will evaluate a different item
    this.itemInCartTitleBE = page.locator("[href='/product_details/1']");
    this.checkOutBTN = page.locator("[class='btn btn-default check_out']");
    this.orderValidation = page.getByTestId("order-placed");
  }

  async verifyCartDetailsUI(price: string, title: string) {
    await expect(this.cartPriceUI).toHaveText(price);
    await expect(this.itemInCartTitleUI).toHaveText(title);
  }

  async verifyCartPriceLogically(storedDetails: string[]) {
    const cartPriceValue = (await this.cartPriceBE.allInnerTexts()).toString();
    const cartItemTitle = (
      await this.itemInCartTitleBE.allInnerTexts()
    ).toString();
    if (
      cartPriceValue === storedDetails[0] &&
      cartItemTitle === storedDetails[1]
    ) {
      return true;
    } else {
      test.fail();
    }
  }

  async validateOrderPlaced() {
    this.orderValidation.isVisible();
    const textFetched = (await this.orderValidation.allInnerTexts())
      .toString()
      .toUpperCase();
    await expect(textFetched).toBe("ORDER PLACED!");
  }
}
