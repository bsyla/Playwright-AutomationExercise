import { Page } from "@playwright/test";

const blockedHosts = /googleads|doubleclick|adservice|googlesyndication|adsystem/;

export const blockThirdParty = async (page: Page) => {
  await page.route(blockedHosts, (route) => route.abort());
};
