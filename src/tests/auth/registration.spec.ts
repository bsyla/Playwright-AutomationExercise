import { test } from "../../fixtures/test";
import { AccountPage } from "../../pages/account.page";

test.use({ storageState: undefined });

test("New user can register and delete account @smoke", async ({
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
	await signupPage.assertAccountCreated();
	await signupPage.continueToAccount();

	await header.expectLoggedIn(user.firstName);
	await header.deleteAccount();

	const accountPage = new AccountPage(page);
	await accountPage.assertAccountDeleted();
	await accountPage.continueAfterDeletion();
});
