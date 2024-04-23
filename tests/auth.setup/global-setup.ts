import { test as setup } from "@playwright/test";
import SignupLoginPage from "../../pageObjects/signup-login-page";
import BasePage from "../../pageObjects/basePage";

const authFile = "./.auth/LoginAuth.json";

setup("Sign in", async ({ page }) => {
  const basePage = new BasePage(page);
  const loginPage = new SignupLoginPage(page);
  await basePage.navigateToPage("/login");
  await loginPage.loginForm("hedipi6572@acname.com", "password");
  await basePage.assertPageUrl("/");

  await page.context().storageState({ path: authFile });
});
