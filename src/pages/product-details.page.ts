import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductDetailsPage extends BasePage {
  private readonly quantityInput = this.page.locator("#quantity");
  private readonly addToCartButton = this.page.getByRole("button", {
    name: /Add to cart/i,
  });
  private readonly viewCartLink = this.page.getByRole("link", {
    name: /View Cart/i,
  });
  private readonly continueShoppingButton = this.page.getByRole("button", {
    name: /Continue Shopping/i,
  });

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.viewCartLink).toBeVisible();
  }

  async openCartFromModal() {
    await expect(this.viewCartLink).toBeVisible();
    await this.viewCartLink.click();
  }

  async continueShopping() {
    if (await this.continueShoppingButton.isVisible()) {
      await this.continueShoppingButton.click();
    }
  }
}
