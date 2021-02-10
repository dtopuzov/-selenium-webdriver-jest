import { By } from "selenium-webdriver";
import { Browser } from "../../../src/browser";

describe("DropDowns Overview", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await new Browser();
        await browser.navigateTo("dropdowns/examples/overview");
    });

    afterAll(async () => {
        await browser.close();
    });

    it("AutoComplete should be present", async () => {
        let element = await browser.find(By.css(".k-autocomplete"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("ComboBox should be present", async () => {
        let element = await browser.find(By.css(".k-combobox"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("DropDownList should be present", async () => {
        let element = await browser.find(By.css(".k-dropdown"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("MultiSelect should be present", async () => {
        let element = await browser.find(By.css(".k-multiselect"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });
});
