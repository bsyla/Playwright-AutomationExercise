import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
	private readonly viewCartLink = this.page.getByRole("link", {
		name: /View Cart/i,
	});
	private readonly continueShoppingButton = this.page.getByRole("button", {
		name: /Continue Shopping/i,
	});

	async goto() {
		await super.goto("/");
	}

	async addProductToCartById(productId: string) {
		const addToCartButton = this.page
			.locator(`[data-product-id="${productId}"]`)
			.first();
		const productCard = this.page
			.locator(".product-image-wrapper")
			.filter({ has: addToCartButton })
			.first();

		await productCard.scrollIntoViewIfNeeded();
		await productCard.hover();
		await addToCartButton.click();
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

	async openProductDetailsByName(productName: string) {
		const card = this.page
			.locator(".product-image-wrapper")
			.filter({ hasText: productName });
		await card.getByRole("link", { name: /View Product/i }).click();
	}
}
