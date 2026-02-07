import { expect } from "@playwright/test";
import type { Product } from "../types/product";
import { formatPrice, parsePrice } from "../utils/price";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  private readonly cartRows = this.page.locator("#cart_info_table tbody tr");
  private readonly checkoutButton = this.page.getByRole("link", {
    name: "Proceed To Checkout",
  });
  private readonly registerLoginLink = this.page.getByRole("link", {
    name: /Register \/ Login/i,
  });

  async waitForItemCount(expected: number) {
    await expect.poll(async () => this.cartRows.count()).toBe(expected);
  }

  async proceedToCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }

  async openRegisterLogin() {
    await expect(this.registerLoginLink).toBeVisible();
    await this.registerLoginLink.click();
  }

  async assertProductInCart(product: Product) {
    const row = this.rowForProduct(product.name);
    await expect(row).toContainText(product.name);
    await expect(row.locator(".cart_price")).toContainText(product.price);
  }

  async assertProductQuantity(productName: string, quantity: number) {
    const row = this.rowForProduct(productName);
    await expect(row.locator(".cart_quantity")).toContainText(
      quantity.toString(),
    );
  }

  async assertProductTotal(
    productName: string,
    unitPrice: string,
    quantity: number,
  ) {
    const row = this.rowForProduct(productName);
    const expectedTotal = formatPrice(parsePrice(unitPrice) * quantity);
    await expect(row.locator(".cart_total_price")).toContainText(expectedTotal);
  }

  async removeProduct(productName: string) {
    const row = this.rowForProduct(productName);
    await row.locator(".cart_delete a").click();
  }

  async assertCartEmpty() {
    await expect.poll(async () => this.cartRows.count()).toBe(0);
    await expect(this.page.getByText(/Cart is empty/i)).toBeVisible();
  }

  private rowForProduct(productName: string) {
    return this.cartRows.filter({ hasText: productName }).first();
  }
}
