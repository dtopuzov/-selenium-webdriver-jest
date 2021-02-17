import { By } from "selenium-webdriver";
import { Browser } from "../../../src/selenium/browser";
import { Settings } from "../../../src/settings/Settings";

describe("Inputs Overview", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await new Browser();
        await browser.navigateTo(Settings.baseUrl + "inputs/examples/input/basic");
    });

    afterEach(async () => {
        await browser.verifyNoJSErrors();
    });

    afterAll(async () => {
        await browser.close();
    });

    it("Input should be present", async () => {
        let element = await browser.find(By.css(".k-textbox"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });
});