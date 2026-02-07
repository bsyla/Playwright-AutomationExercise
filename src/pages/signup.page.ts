import { expect } from "@playwright/test";
import type { User } from "../types/user";
import { BasePage } from "./base.page";

export class SignupPage extends BasePage {
  private readonly password = this.getByTestId("password");
  private readonly birthDay = this.getByTestId("days");
  private readonly birthMonth = this.getByTestId("months");
  private readonly birthYear = this.getByTestId("years");
  private readonly firstName = this.getByTestId("first_name");
  private readonly lastName = this.getByTestId("last_name");
  private readonly company = this.getByTestId("company");
  private readonly address = this.getByTestId("address");
  private readonly address2 = this.getByTestId("address2");
  private readonly country = this.getByTestId("country");
  private readonly state = this.getByTestId("state");
  private readonly city = this.getByTestId("city");
  private readonly zipcode = this.getByTestId("zipcode");
  private readonly mobile = this.getByTestId("mobile_number");
  private readonly createAccountButton = this.getByTestId("create-account");
  private readonly accountCreated = this.getByTestId("account-created");
  private readonly continueButton = this.getByTestId("continue-button");

  async completeRegistration(user: User) {
    await expect(
      this.page.getByRole("heading", { name: /Enter Account Information/i }),
    ).toBeVisible();
    const titleLabel = user.title === "Mr" ? /Mr/i : /Mrs/i;
    await this.page.getByLabel(titleLabel).first().check();
    await this.password.fill(user.password);
    await this.birthDay.selectOption({ label: user.birthDay });
    await this.birthMonth.selectOption({ label: user.birthMonth });
    await this.birthYear.selectOption({ label: user.birthYear });
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address.fill(user.address);
    if (user.address2) {
      await this.address2.fill(user.address2);
    }
    await this.country.selectOption({ label: user.country });
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobile.fill(user.mobile);
    await this.createAccountButton.click();
  }

  async assertAccountCreated() {
    await expect(this.accountCreated).toBeVisible();
  }

  async continueToAccount() {
    await this.continueButton.click();
  }
}
