import { expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { PaymentDetails } from "../types/payment";

export class PaymentPage extends BasePage {
  private readonly nameOnCard = this.getByTestId("name-on-card");
  private readonly cardNumber = this.getByTestId("card-number");
  private readonly cvc = this.getByTestId("cvc");
  private readonly expiryMonth = this.getByTestId("expiry-month");
  private readonly expiryYear = this.getByTestId("expiry-year");
  private readonly payButton = this.getByTestId("pay-button");
  private readonly orderPlaced = this.getByTestId("order-placed");

  async completePayment(details: PaymentDetails) {
    await expect(this.page.getByRole("heading", { name: /Payment/i })).toBeVisible();
    await this.nameOnCard.fill(details.nameOnCard);
    await this.cardNumber.fill(details.cardNumber);
    await this.cvc.fill(details.cvc);
    await this.expiryMonth.fill(details.expiryMonth);
    await this.expiryYear.fill(details.expiryYear);
    await this.payButton.click();
  }

  async assertOrderPlaced() {
    await expect(this.orderPlaced).toBeVisible();
  }
}
