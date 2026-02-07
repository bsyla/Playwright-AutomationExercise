import { test } from "../../fixtures/test";
import { AccountPage } from "../../pages/account.page";

test.use({ storageState: undefined });

test("Rejects registration with existing email @regression", async ({
	authPage,
	signupPage,
	header,
	userFactory,
	page,
}) => {
	const user = userFactory.createUser();

	await authPage.goto();
	await authPage.startSignup(user);
	await signupPage.completeRegistration(user);
	await signupPage.continueToAccount();

	await header.logout();
	await authPage.startSignup(user);
	await authPage.assertSignupError("Email Address already exist!");

	await authPage.login(user.email, user.password);
	await header.deleteAccount();

	const accountPage = new AccountPage(page);
	await accountPage.assertAccountDeleted();
});
