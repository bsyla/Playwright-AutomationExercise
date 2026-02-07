import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
	private readonly placeOrderButton = this.page.getByRole("link", {
		name: /Place Order/i,
	});
	private readonly commentBox = this.page.locator('textarea[name="message"]');

	async assertAddressDetailsVisible() {
		await expect(
			this.page.getByRole("heading", { name: /Address Details/i }),
		).toBeVisible();
	}

	async addOrderComment(comment: string) {
		await this.commentBox.fill(comment);
	}

	async placeOrder() {
		await this.placeOrderButton.click();
	}
}
