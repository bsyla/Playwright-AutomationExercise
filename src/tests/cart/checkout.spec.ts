import { test } from "../../fixtures/test";
import { products } from "../../fixtures/test-data";

const [primaryProduct] = products;

test("Authenticated user can place an order @smoke", async ({
  homePage,
  cartPage,
  checkoutPage,
  paymentPage,
  header,
  userFactory,
}) => {
  const payment = userFactory.createPayment();

  await homePage.goto();
  await header.expectLoggedIn();

  await homePage.addProductToCartById(primaryProduct.id);
  await homePage.openCartFromModal();
  await cartPage.waitForItemCount(1);
  await cartPage.assertProductInCart(primaryProduct);

  await cartPage.proceedToCheckout();
  await checkoutPage.assertAddressDetailsVisible();
  await checkoutPage.addOrderComment("Please deliver during business hours.");
  await checkoutPage.placeOrder();

  await paymentPage.completePayment(payment);
  await paymentPage.assertOrderPlaced();
});

test("User can update quantity and remove items @regression", async ({
  homePage,
  productDetailsPage,
  cartPage,
}) => {
  await homePage.goto();
  await homePage.openProductDetailsByName(primaryProduct.name);

  await productDetailsPage.setQuantity(2);
  await productDetailsPage.addToCart();
  await productDetailsPage.openCartFromModal();

  await cartPage.waitForItemCount(1);
  await cartPage.assertProductQuantity(primaryProduct.name, 2);
  await cartPage.assertProductTotal(
    primaryProduct.name,
    primaryProduct.price,
    2
  );
  await cartPage.removeProduct(primaryProduct.name);
  await cartPage.assertCartEmpty();
});
