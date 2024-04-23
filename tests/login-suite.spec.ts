import { test, type Page } from "@playwright/test";
import CredentialsGenerator from "../fixtures/credentialsGenerator";
import HomePage from "../pageObjects/homePage";
import SignupLoginPage from "../pageObjects/signup-login-page";

const generatedUser = new CredentialsGenerator();

// test.skip("Sign up as standard user", async ({ browser }) => {
//   const homePage = new HomePage(page);
//   const signupPage = new SignupLoginPage(page);
//   await homePage.navigateToPage("/");
//   await homePage.clickButton(page.getByText(" Signup / Login"));
//   await homePage.assertPageUrl("/login");
//   await signupPage.signUpForm(
//     generatedUser.user().firstName,
//     generatedUser.user().email
//   );
// });

// test.skip("Login with existing user", async ({ page, context }) => {
//   await context.clearCookies();
//   const homePage = new HomePage(page);
//   const loginPage = new SignupLoginPage(page);
//   await homePage.navigateToPage("/login");
//   await loginPage.loginForm("hedipi6572@acname.com", "password");
//   await homePage.assertPageUrl("/");
// });
