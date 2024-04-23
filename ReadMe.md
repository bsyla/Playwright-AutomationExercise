# Final Assignment Playwright

The projects goes over two scenarios:

- Adding item to cart and validating the correct item and price is shown. Two approaches were created, one by evaluating UI wise that the item details were the same and one by storing the item's prices from the HomePage and comparing it to the one shown in the Cart Page.

* Complete the checkout flow. For this one i have used storageState to make sure that during all tests the user is logged in, and [faker.js](https://fakerjs.dev/) library for inputting payment details.
* I have used Codegen as the initial step of finding locators and then edited the copied script to follow with best practices mentioned during the course.
* Execution is made for **Chromium** and **Firefox** as requested.
* The `login-suite` spec file was created for testing purposes so i have commented it out.
* For authentication i have used `tests/auth.setup/global-setup` for declaring the login flow and stored the `storageState` to `.auth/LoginAuth.json`.
* Added a Github Workflow to execute tests upon every **PR**.
* Edited the config file in order to create an HTML report upon every run and create a trace with video for failed ones only.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Playwright.

```bash
npm install --save-dev
```

## Install playwright

```bash
npx install playwright
```

## Running the project

```bash
npx playwright test
```

This command will run and provide an HTML report once finished.
