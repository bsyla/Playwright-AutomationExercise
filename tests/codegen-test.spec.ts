import { test } from "@playwright/test";
import BasePage from "../pageObjects/basePage";

test("CodeGen", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  const basePage = new BasePage(page);
  basePage.blockAds(); //added this so we wouldn't have any flaky tests
  await page.locator("[data-product-id='1']").first().click(); //edited default locator since it wasn't being found
  await page.getByRole("link", { name: "View Cart" }).click();
  await page.getByText("Proceed To Checkout").click();
  await page.getByRole("link", { name: "Place Order" }).click();
  await page.locator('input[name="name_on_card"]').click();
  await page.locator('input[name="name_on_card"]').fill("John Smith");
  await page.locator('input[name="name_on_card"]').press("Tab");
  await page
    .locator('input[name="card_number"]')
    .fill("ahdskjaghdsashdkahkdhk");
  await page.locator('input[name="card_number"]').press("Tab");
  await page.getByPlaceholder("ex.").fill("311");
  await page.getByPlaceholder("ex.").press("Tab");
  await page.getByPlaceholder("MM").fill("01");
  await page.getByPlaceholder("MM").press("Tab");
  await page.getByPlaceholder("YYYY").fill("2000");
  await page.getByRole("button", { name: "Pay and Confirm Order" }).click();
});
