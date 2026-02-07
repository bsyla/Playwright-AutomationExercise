/** biome-ignore-all lint/correctness/noEmptyPattern: <explanation> */
import { test as base, expect } from "@playwright/test";
import { HeaderComponent } from "../components/header.component";
import { type AppConfig, getConfig } from "../config";
import { AuthPage } from "../pages/auth.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { HomePage } from "../pages/home.page";
import { PaymentPage } from "../pages/payment.page";
import { ProductDetailsPage } from "../pages/product-details.page";
import { SignupPage } from "../pages/signup.page";
import { AccountApi } from "../services/account.api";
import { blockThirdParty } from "../utils/network";
import { UserFactory } from "./user.factory";

type Fixtures = {
  config: AppConfig;
  header: HeaderComponent;
  homePage: HomePage;
  authPage: AuthPage;
  signupPage: SignupPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  accountApi: AccountApi;
  userFactory: UserFactory;
};

const test = base.extend<Fixtures>({
  config: async ({}, use) => {
    await use(getConfig());
  },
  page: async ({ page }, use) => {
    await blockThirdParty(page);
    await use(page);
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  accountApi: async ({ request, config }, use) => {
    await use(new AccountApi(request, config));
  },
  userFactory: async ({}, use) => {
    await use(new UserFactory());
  },
});

export { test, expect };
