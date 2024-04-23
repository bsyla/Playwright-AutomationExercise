import { Page, Locator, expect } from "@playwright/test";
import HomePage from "./homePage";

export default class SignupLoginPage {
  readonly page: Page;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginEmail = this.page.getByTestId("login-email");
    this.loginPassword = this.page.getByTestId("login-password");
    this.loginButton = this.page.getByTestId("login-button");
  }

  async signUpForm(username: string, email: string) {
    await this.page.getByPlaceholder("Name").click();
    await this.page.getByPlaceholder("Name").fill(username);
    await this.page.getByPlaceholder("Name").press("Tab");
    await this.page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address")
      .fill(email);
    await this.page.getByRole("button", { name: "Signup" }).click();
  }

  async loginForm(email: string, password: string) {
    const homePage = new HomePage(this.page);
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await homePage.clickButton(this.loginButton);
  }
}
