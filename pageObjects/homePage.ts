import { Page, Locator, expect } from "@playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly addToCartBtn: Locator;
  readonly viewCart: Locator;
  readonly productInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.locator("[data-product-id='1']").first();
    this.viewCart = page.getByRole("link", { name: "View Cart" });
    this.productInfo = page
      .locator("[class='productinfo text-center']")
      .first();
  }

  async storeProductInfo() {
    var productDetails = await this.productInfo.allInnerTexts();
    var specifiedProduct = productDetails.toString();
    var productPrice = specifiedProduct.slice(0, 7);
    var productTitle = specifiedProduct.slice(9, 17);
    return [productPrice, productTitle];
  }
}
