import { defineConfig, devices, type ReporterDescription } from "@playwright/test";
import { getConfig } from "./src/config";

const config = getConfig();

const reporters: ReporterDescription[] = [
  ["html", { open: "never" }],
  [process.env.CI ? "github" : "list"],
];

if (process.env.ALLURE === "true") {
  reporters.push(["allure-playwright"]);
}

export default defineConfig({
  testDir: "./src/tests",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: reporters,
  metadata: {
    testEnv: config.testEnv,
  },
  expect: {
    timeout: config.timeouts.expect,
  },
  use: {
    baseURL: config.baseUrl,
    actionTimeout: config.timeouts.action,
    navigationTimeout: config.timeouts.navigation,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    testIdAttribute: "data-qa",
    storageState: config.storageStatePath,
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: { storageState: undefined },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      dependencies: ["setup"],
    },
  ],
});
