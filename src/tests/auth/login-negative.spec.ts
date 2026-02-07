import { test } from "../../fixtures/test";
import { invalidLoginCases } from "../../fixtures/test-data";

test.describe("Login validation @regression", () => {
	test.use({ storageState: undefined });

	for (const loginCase of invalidLoginCases) {
		test(`${loginCase.title} @regression`, async ({ authPage }) => {
			await authPage.goto();
			await authPage.login(loginCase.email, loginCase.password);
			await authPage.assertLoginError(loginCase.error);
		});
	}
});
