import { test } from "../../fixtures/test";
import { products } from "../../fixtures/test-data";

const [primaryProduct] = products;

test.describe("Checkout access control @regression", () => {
  test.use({ storageState: undefined });

  test("Guest users are prompted to log in @regression", async ({
    homePage,
    cartPage,
    authPage,
  }) => {
    await homePage.goto();
    await homePage.addProductToCartById(primaryProduct.id);
    await homePage.openCartFromModal();

    await cartPage.proceedToCheckout();
    await cartPage.openRegisterLogin();
    await authPage.assertOnLoginPage();
  });
});
