import { By } from "selenium-webdriver";
import { Browser } from "../../../src/selenium/browser";

describe("Inputs Overview", () => {
    let browser: Browser;
    beforeAll(async () => {
        browser = await new Browser();
        await browser.navigateTo("inputs/examples/basic");
    });

    afterEach(async () => {
        await browser.verifyNoJSErrors();
    });

    afterAll(async () => {
        await browser.close();
    });

    it("TestBox should be present", async () => {
        let element = await browser.find(By.css(".k-floating-label-container > input.k-textbox"));
        await expect(element.isDisplayed()).resolves.toBe(true);
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("NumericTextBox should be present", async () => {
        let element = await browser.find(By.css(".k-numerictextbox"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("MaskedTextBox should be present", async () => {
        let element = await browser.find(By.css(".k-maskedtextbox"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("Slider should be present", async () => {
        let element = await browser.find(By.css(".k-slider"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });
});
