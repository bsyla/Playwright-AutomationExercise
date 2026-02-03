import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class AccountPage extends BasePage {
  private readonly accountDeleted = this.getByTestId("account-deleted");
  private readonly continueButton = this.getByTestId("continue-button");

  async assertAccountDeleted() {
    await expect(this.accountDeleted).toBeVisible();
  }

  async continueAfterDeletion() {
    await this.continueButton.click();
  }
}
