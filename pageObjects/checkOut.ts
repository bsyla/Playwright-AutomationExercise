import { Page, Locator, expect, test } from "@playwright/test";
import CredentialsGenerator from "../fixtures/credentialsGenerator";

const generatedDetails = new CredentialsGenerator();
export default class CheckOut {
  readonly page: Page;
  readonly paymentPageTitle: Locator;
  readonly nameOnCard: Locator;
  readonly creditCardNumber: Locator;
  readonly cVV: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly clickPayBTN: Locator;

  constructor(page: Page) {
    this.paymentPageTitle = page.getByText("Payment");
    this.nameOnCard = page.getByTestId("name-on-card");
    this.creditCardNumber = page.getByTestId("card-number");
    this.cVV = page.getByTestId("cvc");
    this.expiryMonth = page.getByTestId("expiry-month");
    this.expiryYear = page.getByTestId("expiry-year");
    this.clickPayBTN = page.getByTestId("pay-button");
  }

  async validateTitle() {
    const title = (
      await this.paymentPageTitle.first().allInnerTexts()
    ).toString();
    await expect(title).toBe("Payment");
  }

  async fillInCreditCardForm() {
    await this.nameOnCard.fill(generatedDetails.user().firstName);
    await this.creditCardNumber.fill(
      generatedDetails.finance().creditCardNumber
    );
    await this.cVV.fill(generatedDetails.finance().CVC);
    await this.expiryMonth.fill(generatedDetails.date().month);
    await this.expiryYear.fill("2030");
  }
}
