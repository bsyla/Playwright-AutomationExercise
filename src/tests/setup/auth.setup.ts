import { test as setup } from "@playwright/test";
import { promises as fs } from "fs";
import path from "path";
import { getConfig } from "../../config";
import { HeaderComponent } from "../../components/header.component";
import { UserFactory } from "../../fixtures/user.factory";
import { AuthPage } from "../../pages/auth.page";
import { SignupPage } from "../../pages/signup.page";
import { AccountApi } from "../../services/account.api";
import { blockThirdParty } from "../../utils/network";

const config = getConfig();

setup("Create authenticated storage state", async ({ page, request }) => {
  await blockThirdParty(page);
  const userFactory = new UserFactory();
  const user = userFactory.createUser();
  const accountApi = new AccountApi(request, config);
  const authPage = new AuthPage(page);
  const signupPage = new SignupPage(page);
  const header = new HeaderComponent(page);

  const apiResult = await accountApi.createAccount(user);

  if (!apiResult.ok) {
    await authPage.goto();
    await authPage.startSignup(user);
    await signupPage.completeRegistration(user);
    await signupPage.assertAccountCreated();
    await signupPage.continueToAccount();
    await header.expectLoggedIn();
  } else {
    await authPage.goto();
    await authPage.login(user.email, user.password);
    await header.expectLoggedIn();
  }

  await fs.mkdir(path.dirname(config.storageStatePath), { recursive: true });
  await page.context().storageState({ path: config.storageStatePath });
});
