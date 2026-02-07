import { expect } from "@playwright/test";
import type { User } from "../types/user";
import { BasePage } from "./base.page";

export class AuthPage extends BasePage {
  private readonly loginEmail = this.getByTestId("login-email");
  private readonly loginPassword = this.getByTestId("login-password");
  private readonly loginButton = this.getByTestId("login-button");
  private readonly signupName = this.getByTestId("signup-name");
  private readonly signupEmail = this.getByTestId("signup-email");
  private readonly signupButton = this.getByTestId("signup-button");

  async goto() {
    await super.goto("/login");
    await this.assertOnLoginPage();
  }

  async assertOnLoginPage() {
    await expect(
      this.page.getByRole("heading", { name: /Login to your account/i }),
    ).toBeVisible();
    await expect(this.page).toHaveURL(/\/login/);
  }

  async login(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async startSignup(user: Pick<User, "firstName" | "email">) {
    await this.signupName.fill(user.firstName);
    await this.signupEmail.fill(user.email);
    await this.signupButton.click();
  }

  async assertLoginError(message: string) {
    await this.page.on("dialog", async (dialog) => {
      await dialog.accept(message);
    });
  }

  async assertSignupError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
